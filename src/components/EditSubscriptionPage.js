import React from 'react';
import { editSubscription, loadSubscriptionDetail, archiveSubscription, unarchiveSubscription } from '../store/actions/subscriptions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import ArchiveIcon from '@material-ui/icons/Archive';

export class EditSubscription extends React.Component {
    state = {}

    componentWillMount() {
        this.props.clearDetails()
        this.props.loadSubscriptionDetail(this.props.match.params.id)
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.props.subscription, ...this.state, user: this.props.user_id };

        console.log('Editing', form_data)
        this.props.editSubscription(this.props.match.params.id, form_data);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.subscription) {
            console.log('Setting toggle values', nextProps.subscription)
            this.setState({
                watch_token_transfers: nextProps.subscription.watch_token_transfers,
                summary_notifications: nextProps.subscription.summary_notifications
            });
        }
    }

    render() {
        if (!this.props.subscription || !this.props.user_id)
            return <Typography>Loading...</Typography>



        return <Card><form onSubmit={this.OnSubmit}>
            <FormGroup row>
                <TextField
                    id="nickname"
                    label="Nickname"
                    defaultValue={this.props.subscription.nickname}
                    onChange={(e) => this.setState({ nickname: e.target.value })} />
            </FormGroup>
            <FormGroup row>
                <TextField
                    id="watched_address"
                    label="Watched Address"
                    defaultValue={this.props.subscription.watched_address}
                    onChange={(e) => this.setState({ watched_address: e.target.value })} />
            </FormGroup>
            <FormGroup row>
                <TextField
                    id="notify_email"
                    label="Notify Email"
                    defaultValue={this.props.subscription.notify_email}
                    onChange={(e) => this.setState({ notify_email: e.target.value })} />
            </FormGroup>
            <FormGroup row>
                <TextField
                    id="notify_url"
                    label="Notify Url"
                    defaultValue={this.props.subscription.notify_url}
                    onChange={(e) => this.setState({ notify_url: e.target.value })} />
            </FormGroup>

            <FormGroup row>
                <FormControlLabel control={
                    <Switch
                        onChange={(e) => this.setState({ watch_token_transfers: e.target.checked })}
                        value="watch_token_transfers"
                        color="primary"
                        checked={this.state.watch_token_transfers}
                    />
                }
                    label="Watch Token Tranfers"
                />
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(e) => this.setState({ summary_notifications: e.target.checked })}
                            value="summary_notifications"
                            color="primary"
                            checked={this.state.summary_notifications}
                        />
                    }
                    label="Summary Notifications"
                />
            </FormGroup>
            <Button
                style={{ marginRight: '1em' }}
                type="submit"
                variant="raised"
                color="primary"
                onClick={this.OnSubmit}>

                <Typography variant="button" gutterBottom className="logintypography">
                    Edit Subscription
                    </Typography>
            </Button>
            {!this.props.subscription.archived_at ?
                <Button color="secondary" onClick={(e) => this.props.archive(this.props.subscription.id)} >
                    <ArchiveIcon />Archive
                </Button>
                :
                <Button color="secondary" onClick={(e) => this.props.unarchive(this.props.subscription.id)} >
                    <ArchiveIcon />Unarchive
                </Button>
            }

        </form>

        </Card>
    }

}
const mapStateToProps = (state) => ({
    user_id: state.auth.user_id,
    subscription: state.subscriptions.detail,
})
const mapDispatchToProps = (dispatch) => ({
    loadSubscriptionDetail: (id) => dispatch(loadSubscriptionDetail(id)),
    editSubscription: (id, data) => dispatch(editSubscription(id, data)),
    archive: (id) => dispatch(archiveSubscription(id)),
    unarchive:(id) => dispatch(unarchiveSubscription(id)),
    clearDetails: () => dispatch({ type: 'CLEAR_SUBSCRIPTION_DETAILS' })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSubscription);