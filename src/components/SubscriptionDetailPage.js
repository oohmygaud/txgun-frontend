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
        this.setState({ page: page})
    }

    componentWillMount() {
        this.props.loadSubscriptionDetail(this.props.match.params.id)
        this.props.loadSubscriptionTransactions(this.props.match.params.id)
    }

    render() {
        if (!this.props.subscription || !this.props.transactions)
            return <Typography>Loading...</Typography>
        return <Grid container spacing={24}>
            <Link to={'/subscriptions/' + this.props.subscription.id + '/edit'}>
                <Button>Edit</Button>
            </Link>
            <TransactionTable transactions={this.props.transactions.results} />
            <Button disabled={this.props.transactions.previous == null} onClick={(e) => this.loadPage(this.state.page - 1)}>Previous Page</Button>
            <Button disabled={this.props.transactions.next == null} onClick={(e) => this.loadPage(this.state.page + 1)}>Next Page</Button>Page {this.state.page}
            
        </Grid>

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