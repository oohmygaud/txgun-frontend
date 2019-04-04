import React from 'react';
import { loadSubscriptionList, pauseSubscription, unpauseSubscription } from '../store/actions/subscriptions';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SubscriptionPage extends React.Component {

    state = {}

    componentWillMount() {
        this.props.loadSubscriptionList()
    }
    render() {
        if (!this.props.subscriptions)
            return <Typography>Loading...</Typography>
        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/'}><Button>Back to Dashboard</Button></Link>

                </Grid>
                <Grid item sm={6} xs={12} style={{ marginBottom: '0.5em', textAlign: "center" }}>
                    <h2>Subscriptions</h2>

                </Grid>
                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>
                    <Link to="/subscriptions/create">
                        <Button>Create</Button></Link>
                </Grid>
            </Grid>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Watched Address</TableCell>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.subscriptions.results.map(subscription => (
                            <TableRow key={subscription.id}>
                                <TableCell>
                                    <Link to={'/subscriptions/' + subscription.id}>{subscription.watched_address}</Link>
                                </TableCell>
                                <TableCell>{subscription.nickname}</TableCell>
                                <TableCell>
                                    <FormControlLabel control={
                                        <Switch
                                            onChange={(e) => subscription.status == "active" ?
                                                             this.props.pause(subscription.id) : this.props.unpause(subscription.id)}
                                            value="status"
                                            color="secondary"
                                            checked={subscription.status == "active"}
                                        />
                                    }
                                    />
                                    {subscription.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    subscriptions: state.subscriptions.data
});

const mapDispatchToProps = (dispatch) => ({
    loadSubscriptionList: () => dispatch(loadSubscriptionList()),
    pause: (id) => dispatch(pauseSubscription(id)),
    unpause: (id) => dispatch(unpauseSubscription(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);