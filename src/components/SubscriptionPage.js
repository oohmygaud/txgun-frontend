import React from 'react';
import { loadSubscriptionList } from '../store/actions/subscriptions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class SubscriptionPage extends React.Component {
    componentWillMount() {
        this.props.loadSubscriptionList()
    }
    render() {
        if (!this.props.subscriptions)
            return <Typography>Loading...</Typography>
        return <Grid item xs={12} style={{ marginTop: 10 }}>
            <Card>
                <Link to="/subscriptions/create">
                    <Button>Create</Button></Link>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Watched Address</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.subscriptions.results.map(subscription => (
                            <TableRow key={subscription.id}>
                                <TableCell>
                                    <Link to={'/subscriptions/' + subscription.id}>{subscription.watched_address}</Link></TableCell>
                                <TableCell>{subscription.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Grid>
    }
}

const mapStateToProps = (state) => ({
    subscriptions: state.subscriptions.data
});

const mapDispatchToProps = (dispatch) => ({
    loadSubscriptionList: () => dispatch(loadSubscriptionList())
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);