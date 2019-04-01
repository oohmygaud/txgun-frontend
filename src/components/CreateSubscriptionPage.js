import React from 'react';
import { createSubscription } from '../store/actions/subscriptions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
require('prismjs');
require('prismjs/themes/prism.css');
import PrismCode from 'react-prism';

export class CreateSubscription extends React.Component {
    state = {
        nickname: "",
        watched_address: "",
        notify_email: "",
        notify_url: "",
        watch_token_transfers: false,
        summary_notifications: false
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id };

        console.log('Creating', form_data)
        this.props.createSubscription(form_data);
    };

    render() {

        return <Grid container spacing={24}>
            <Grid item xs={6}>
                <Card>
                    <form onSubmit={this.OnSubmit}>
                        <FormGroup row>
                            <TextField id="nickname"
                                label="Nickname"
                                onChange={(e) => this.setState({ nickname: e.target.value })} />
                        </FormGroup>
                        <FormGroup row>
                            <TextField id="watched_address"
                                label="Watched Address"
                                onChange={(e) => this.setState({ watched_address: e.target.value })} />
                        </FormGroup>
                        <FormGroup row>
                            <TextField id="notify_email"
                                label="Notify Email"
                                onChange={(e) => this.setState({ notify_email: e.target.value })} />
                        </FormGroup>
                        <FormGroup row>
                            <TextField id="notify_url"
                                label="Notify Url"
                                onChange={(e) => this.setState({ notify_url: e.target.value })} />
                        </FormGroup>

                        <FormGroup row>
                            <FormControlLabel control={
                                <Switch
                                    onChange={(e) => this.setState({ watch_token_transfers: e.target.checked })}
                                    value="watch_token_transfers"
                                    color="primary"
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
                                    />
                                }
                                label="Summary Notifications"
                            />
                        </FormGroup>
                        <Button type="submit"
                            variant="raised"
                            color="primary"
                            onClick={this.OnSubmit}>
                            <Typography variant="button" gutterBottom className="logintypography">
                                Create Subscription
                            </Typography>
                        </Button>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <PrismCode component="pre" className="language-javascript">
                       
{`
curl -XPOST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${localStorage.getItem('authToken')}" \\
  -d '{
    "user": ${this.props.user_id},
    "nickname": "${this.state.nickname}",
    "watched_address": "${this.state.watched_address}",
    "notify_email": "${this.state.notify_email}",
    "notify_url": "${this.state.notify_url}",
    "watch_token_transfers": "${this.state.watch_token_transfers}",
    "summary_notifications": "${this.state.summary_notifications}"
    
    
  }' \\
  https://txgun.io/subscriptions/
`}
                       
                    </PrismCode>
                </Card>
            </Grid>
        </Grid>
    }

}
const mapStateToProps = (state) => ({
    user_id: state.auth.user_id,
})
const mapDispatchToProps = (dispatch) => ({
    createSubscription: (data) => dispatch(createSubscription(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubscription);