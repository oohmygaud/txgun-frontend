import React from 'react';
import { connect } from 'react-redux';
import { loadSubscriptionDetail, loadSubscriptionTransactions } from '../store/actions/subscriptions';
import Typography from '@material-ui/core/Typography';
import TransactionTable from './TransactionTable';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class SubscriptionDetailPage extends React.Component {

    state = {
        page: 1
    }

    loadPage(page) {
        this.props.loadSubscriptionTransactions(this.props.match.params.id, page)
        this.setState({ page: page })
    }

    componentWillMount() {
        this.props.loadSubscriptionDetail(this.props.match.params.id)
        this.props.loadSubscriptionTransactions(this.props.match.params.id)
    }

    render() {
        if (!this.props.subscription || !this.props.transactions)
            return <Typography>Loading...</Typography>
        return <React.Fragment>
            <Grid container >
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/subscriptions/'}> <Button>Back to Subscriptions</Button></Link>
                </Grid>

                <Grid item sm={6} xs={8} style={{marginBottom:'0.5em', textAlign:"center"}} >
                    <h2>{this.props.subscription.nickname} | Transactions</h2>
                </Grid>

                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign:"right" }}>
                    <Link to={'/subscriptions/' + this.props.subscription.id + '/edit'}>
                        <Button color="primary">Edit</Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <TransactionTable transactions={this.props.transactions.results} show_pricing_info={this.props.subscription.include_pricing_data} />
            </Grid>
            <Grid container justify="space-between">
                <Grid item>
                    <Button color="secondary" disabled={this.props.transactions.previous == null}
                        onClick={(e) => this.loadPage(this.state.page - 1)}>Previous Page</Button>
                </Grid>


                <Grid item><Button disabled>Page {this.state.page}</Button></Grid>

                <Grid item>
                    <Button color="secondary" disabled={this.props.transactions.next == null}
                        onClick={(e) => this.loadPage(this.state.page + 1)}>Next Page</Button>
                </Grid>
            </Grid>

        </React.Fragment>

    }
}

const mapStateToProps = (state) => ({
    subscription: state.subscriptions.detail,
    transactions: state.subscriptions.transactions
});

const mapDispatchToProps = (dispatch) => ({
    loadSubscriptionDetail: (id) => dispatch(loadSubscriptionDetail(id)),
    loadSubscriptionTransactions: (id, page) => dispatch(loadSubscriptionTransactions(id, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionDetailPage);