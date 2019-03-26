import React from 'react';
import { connect } from 'react-redux';
import { loadSubscriptionDetail, loadSubscriptionTransactions } from '../store/actions/subscriptions';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

class SubscriptionDetailPage extends React.Component {
    componentWillMount() {
        this.props.loadSubscriptionDetail(this.props.match.params.id)
        this.props.loadSubscriptionTransactions(this.props.match.params.id)
    }

    render() {
        if (!this.props.subscription || !this.props.transactions)
            return <Typography>Loading...</Typography>
        return <Grid item xs={12} style={{ marginTop: 10 }}>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Transactions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.transactions.results.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Grid>
    }
}

const mapStateToProps = (state) => ({
    subscription: state.subscriptions.detail,
    transactions: state.subscriptions.transactions
});

const mapDispatchToProps = (dispatch) => ({
    loadSubscriptionDetail: (id) => dispatch(loadSubscriptionDetail(id)),
    loadSubscriptionTransactions: (id) => dispatch(loadSubscriptionTransactions(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionDetailPage);