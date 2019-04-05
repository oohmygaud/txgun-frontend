import React from 'react';
import { createSubscription } from '../store/actions/subscriptions';
import { loadAPIKeyList } from '../store/actions/api_keys';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
        summary_notifications: false,
        widget_use_api_key: false,
        widget_api_key: null
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id };

        console.log('Creating', form_data)
        this.props.createSubscription(form_data);
    };

    componentWillMount() {
        this.props.loadAPIKeyList()
    }

    render() {
        if(!this.props.api_keys) return "Loading..."

        let defaultApiKey = this.props.api_keys.results && this.props.api_keys.results[0].key

        let useApiKey = this.state.widget_api_key || defaultApiKey;

        const apiKey = this.state.widget_use_api_key ? useApiKey : localStorage.getItem('authToken');

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
                <Card style={{ padding: "1em" }}>
                    <h3>API Usage Example</h3>
                    <FormControlLabel control={
                        <Switch
                            onChange={(e) => this.setState({ widget_use_api_key: e.target.checked })}
                            value="widget_use_api_key"
                            color="secondary"
                            checked={this.state.widget_use_api_key == true}
                            disabled={defaultApiKey == false}
                        />
                    }
                        label={this.state.widget_use_api_key == true ? "API Key" : "JWT"}
                    />
                    {this.state.widget_use_api_key ? 
                    <FormControl>
                        <InputLabel>
                            API Key
                        </InputLabel>
                        <Select
                            value={useApiKey}
                            onChange={(e) => this.setState({ widget_api_key: e.target.value })}
                            autoWidth
                        >
                        {this.props.api_keys.results.map(api_key=> (
                            <MenuItem value={api_key.key} key={api_key.id}>
                                <em>{api_key.nickname}</em>
                            </MenuItem>  
                        ))}
                        </Select>
                    </FormControl>
                    : null }
                    <PrismCode component="pre" className="language-javascript">

                        {`
curl -XPOST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
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
    api_keys: state.api_keys.data
})
const mapDispatchToProps = (dispatch) => ({
    createSubscription: (data) => dispatch(createSubscription(data)),
    loadAPIKeyList: (page) => dispatch(loadAPIKeyList(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubscription);