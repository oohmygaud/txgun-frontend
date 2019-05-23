import React from 'react';
import { editSubscription, createSubscription, getABI } from '../store/actions/subscriptions';
import { loadSubscriptionDetail, archiveSubscription, unarchiveSubscription } from '../store/actions/subscriptions';
import { loadAPIKeyList } from '../store/actions/api_keys';
import { loadNetworkList } from '../store/actions/networks';
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
import { baseURL } from '../store/api';
import Checkbox from '@material-ui/core/Checkbox';
require('prismjs/components/prism-python')
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

export class CreateSubscription extends React.Component {
    state = {
        nickname: "",
        watched_address: "",
        notify_email: "",
        notify_url: "",
        watch_token_transfers: false,
        daily_emails: false,
        default_email: true,
        monthly_emails: false,
        include_pricing_data: false,
        specific_contract_calls: false,
        widget_use_api_key: false,
        widget_api_key: null,
        widget_python: null,
        abi_methods: {},
        network: null,
        realtime_emails: true,
        realtime_webhooks: false
    }

    OnSubmit(e) {
        e.preventDefault();
        const form_data = { ...this.state, user: this.props.user_id };
        const method_names = Object.keys(this.state.abi_methods || {})
        form_data.abi_methods = method_names.filter(name => this.state.abi_methods[name]).join(',')

        if (this.props.match.params.id) {
            console.log('Editing', form_data)
            this.props.editSubscription(this.props.match.params.id, form_data);
        } else {
            console.log('Creating', form_data)
            this.props.createSubscription(form_data);
        }
    };

    OnChangeDefaultEmailSwitch(e) {
        this.setState({ default_email: e.target.checked })
        if (e.target.checked)
            this.setState({ notify_email: this.props.user.email })
    }

    OnChangeDefaultURLSwitch(e) {
        this.setState({ default_url: e.target.checked })
        if (e.target.checked)
            this.setState({ notify_url: this.props.user.default_notify_url })
    }

    OnChangeSpecificContractCalls(e) {
        this.setState({ specific_contract_calls: e.target.checked })
        if (e.target.checked)
            this.props.getABI(this.state.watched_address)
    }

    OnChangeABIMethod(e) {
        this.setState({
            abi_methods: {
                ...this.state.abi_methods,
                [e.target.value]: e.target.checked
            }
        })
    }

    renderNicknameField(subscription) {
        return <FormGroup row>
            <TextField
                id="nickname"
                defaultValue={subscription.nickname}
                label="Nickname"
                onChange={(e) => this.setState({ nickname: e.target.value })}
            />
        </FormGroup>
    }

    renderNetworkField() {
        if (this.props.networks.results)
            return <FormControl>
                <InputLabel>
                    Network
                </InputLabel>

                <Select
                    value={this.state.network}
                    onChange={(e) => this.setState({ network: e.target.value })}
                    autoWidth
                >
                    {this.props.networks.results.map(network => (
                        <MenuItem value={network.id} key={network.id}>
                            <em>{network.nickname}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        else
            return null

    }

    renderWatchedAddressField(subscription) {
        return <FormGroup row>
            <TextField
                id="watched_address"
                defaultValue={subscription.watched_address}
                label="Watched Address"
                onChange={(e) => this.setState({ watched_address: e.target.value })}
            />
        </FormGroup>
    }

    renderNotifyEmailField() {
        return <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        onChange={(e) => this.setState({ realtime_emails: e.target.checked })}
                        value="realtime_emails"
                        color="primary"
                        checked={this.state.realtime_emails}
                    />
                }
                label="Real-time Email Notifications"
            />
            {this.state.realtime_emails ?
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => this.OnChangeDefaultEmailSwitch(e)}
                                value='default_email'
                                color='secondary'
                                checked={this.state.default_email}
                            />
                        }
                        label='Default Email'
                    />
                    {this.state.default_email ? null : 
                        <TextField
                            id="notify_email"
                            label="Notify Email"
                            onChange={(e) => this.setState({ notify_email: e.target.value })}
                            value={this.state.notify_email}
                            disabled={this.state.default_email}
                        />
                    }

                </div>
                : null}

        </FormGroup>
    }

    renderNotifyUrlField() {
        const onChangeRealtimeWebhooks = (e) => {
            let update = { realtime_webhooks: e.target.checked }
            if(!e.target.checked)
                update.notify_url = ""
            this.setState(update)
        }

        return <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        onChange={(e) => onChangeRealtimeWebhooks(e)}
                        value="realtime_webhooks"
                        color="primary"
                        checked={this.state.realtime_webhooks}
                    />
                }
                label="Real-time Webhook Notifications"
            />

            {this.state.realtime_webhooks ?
                <div>
                    <TextField id="notify_url"
                        label="Notify Url"
                        onChange={(e) => this.setState({ notify_url: e.target.value })}
                        value={this.state.notify_url}
                        disabled={this.state.default_url}
                    />
                </div>
                : null}

        </FormGroup>
    }

    renderWatchTokenTransfers() {
        return <FormControlLabel
            control={
                <Switch
                    onChange={(e) => this.setState({ watch_token_transfers: e.target.checked })}
                    value="watch_token_transfers"
                    color="primary"
                    checked={this.state.watch_token_transfers}
                />
            }
            label="Watch Token Tranfers"
        />
    }

    renderIncludePricingData() {
        return <FormControlLabel
            control={
                <Switch
                    onChange={(e) => this.setState({ include_pricing_data: e.target.checked })}
                    value="include_pricing_data"
                    color="primary"
                    checked={this.state.include_pricing_data}
                />
            }
            label="Include Pricing Data"
        />
    }

    renderSpecificContractCalls() {
        return <FormControlLabel
            control={
                <Switch
                    onChange={(e) => this.OnChangeSpecificContractCalls(e)}
                    value="specific_contract_calls"
                    color="primary"
                    checked={this.state.specific_contract_calls}
                />
            }
            label="Specific Contract Calls"
        />
    }

    renderDailyNotifications() {
        return <FormControlLabel
            control={
                <Switch
                    onChange={(e) => this.setState({ daily_emails: e.target.checked })}
                    value="daily_emails"
                    color="primary"
                    checked={this.state.daily_emails}
                />
            }
            label="Daily Email Summaries"
        />
    }

    renderMonthlyNotifications() {
        return <FormControlLabel
            control={
                <Switch
                    onChange={(e) => this.setState({ monthly_emails: e.target.checked })}
                    value="monthly_emails"
                    color="primary"
                    checked={this.state.monthly_emails}
                />
            }
            label="Monthly Email Summaries"
        />
    }



    static getDerivedStateFromProps(nextProps, state) {
        const defaultState = {notify_email: nextProps.user && nextProps.user.email}

        // If this is an edit page, we'll have props.subscription
        // so fill in all the state values from the props.subscription
        if (nextProps.subscription && nextProps.subscription.id != state.id
            && nextProps.subscription.id == nextProps.match.params.id)
        {
            return {
                ...nextProps.subscription
            };
        }
        else
        {
            return defaultState;
        }
    }

    componentDidMount() {
        this.props.loadAPIKeyList()
        this.props.loadNetworkList()
        this.props.clearDetails()
        if (this.props.match.params.id)
            this.props.loadSubscriptionDetail(this.props.match.params.id)
    }

    render() {
        if (!this.props.api_keys || !this.props.networks || !this.props.user_id) return "Loading..."

        if (this.props.networks.results && !this.state.network) {
            setTimeout(() => this.setState({ network: this.props.networks.results[0].id }), 100)
            return "Loading...";
        }

        if (!this.props.subscription && this.props.match.params.id)
            return <Typography>Loading...</Typography>

        const authHeader = this.state.widget_use_api_key ? 'Token' : 'Bearer'

        const results = this.props.api_keys && this.props.api_keys.results

        const defaultApiKey = results && results.length && results[0].key

        const useApiKey = this.state.widget_api_key || defaultApiKey;

        const apiKey = this.state.widget_use_api_key ? useApiKey : localStorage.getItem('authToken');

        const subscription = this.props.subscription || {}

        console.log("rendering", this.state)
        return <Grid container spacing={24}>

            <Grid item xs={6}>
                <form onSubmit={(e) => this.OnSubmit(e)}>

                    <Card style={{ padding: "1em" }}>

                        <h3>Subscription Info</h3>

                        {this.renderNicknameField(subscription)}

                        {this.renderNetworkField()}

                        {this.renderWatchedAddressField(subscription)}

                    </Card>

                    <Card style={{ padding: "1em", marginTop: "1em" }}>

                        <h3>Filtering</h3>

                        <FormGroup column="true">

                            {this.renderWatchTokenTransfers()}

                            {this.renderIncludePricingData()}

                            {this.renderSpecificContractCalls()}

                            {this.state.specific_contract_calls && this.props.abi && this.props.abi.abi ?

                                this.props.abi.abi.map(member => (
                                    member.type == "function" && member.stateMutability != "view" && !member.constant ?
                                        <FormControlLabel
                                            key={member.name}
                                            control={
                                                <Checkbox
                                                    onChange={(e) => this.OnChangeABIMethod(e)}
                                                    checked={this.state.abi_methods[member.name] || false}
                                                    value={member.name}
                                                />
                                            }
                                            label={member.name}
                                        /> : null
                                ))
                                : this.props.abi && this.props.abi.error}

                        </FormGroup>

                    </Card>

                    <Card style={{ padding: "1em", marginTop: "1em" }}>

                        <h3>Notifications</h3>

                        <FormGroup column="true">

                            {this.renderNotifyEmailField()}

                            {this.renderNotifyUrlField()}

                            {this.renderDailyNotifications()}

                            {this.renderMonthlyNotifications()}

                        </FormGroup>

                    </Card>


                    <Button
                        style={{ marginTop: "1em" }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => this.OnSubmit(e)}>
                        <Typography variant="button" gutterBottom className="logintypography">
                            {!this.props.subscription ? "Create Subscription" : "Edit Subscription"}
                        </Typography>
                    </Button>

                </form>

            </Grid>


            <Grid item xs={6}>

                <Card style={{ padding: "1em" }}>

                    <h3>API Usage Example</h3>

                    <FormControlLabel control={
                        <Switch
                            onChange={(e) => this.setState({ widget_python: e.target.checked })}
                            value="widget_python"
                            color="secondary"
                            checked={this.state.widget_python == true}
                        />
                    }
                        label={this.state.widget_python == true ? "python" : "curl"}
                    />

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
                                {this.props.api_keys.results.map(api_key => (
                                    <MenuItem value={api_key.key} key={api_key.id}>
                                        <em>{api_key.nickname}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        : null}

                    {this.props.subscription ?
                        !this.props.subscription.archived_at ?
                            <Button color="secondary" onClick={(e) => this.props.archive(this.props.subscription.id)} >
                                <ArchiveIcon />Archive
                            </Button>
                            :
                            <Button color="secondary" onClick={(e) => this.props.unarchive(this.props.subscription.id)} >
                                <UnarchiveIcon />Unarchive
                            </Button>

                        : null}

                    {!this.state.widget_python ?
                        <PrismCode component="pre" className="language-javascript">

                            {`
curl -X${this.props.subscription ? "PUT" : "POST"} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: ${authHeader} ${apiKey}" \\
  -d '{
    "user": ${this.props.user_id},
    "nickname": "${this.state.nickname}",
    "network": "${this.state.network}",
    "watched_address": "${this.state.watched_address}",
    "watch_token_transfers": "${this.state.watch_token_transfers}",
    "include_pricing_data": "${this.state.include_pricing_data}",
    "specific_contract_calls": "${this.state.specific_contract_calls}",
    "realtime_emails": "${this.state.realtime_emails}",
    "realtime_webhooks": "${this.state.realtime_webhooks}",
    "notify_email": "${this.state.notify_email}",
    "notify_url": "${this.state.notify_url}",
    "daily_emails": "${this.state.daily_emails}",
    "monthly_emails": "${this.state.monthly_emails}"
    
    
    
  }' \\
  ${baseURL}subscriptions/${this.props.subscription ? this.props.subscription.id + "/" : null}
`}

                        </PrismCode>
                        : <PrismCode component="pre" className="language-python">

                            {`
import requests
requests.${this.props.subscription ? "put" : "post"}(
    '${baseURL}subscriptions/${this.props.subscription ? this.props.subscription.id + "/" : null}',
    auth=('${authHeader}', '${apiKey}'), 
    data= {
"user": ${this.props.user_id},
"nickname": "${this.state.nickname}",
"network": "${this.state.network}",
"watched_address": "${this.state.watched_address}",
"watch_token_transfers": "${this.state.watch_token_transfers}",
"include_pricing_data": "${this.state.include_pricing_data}",
"specific_contract_calls": "${this.state.specific_contract_calls}",
"realtime_emails": "${this.state.realtime_emails}",
"realtime_webhooks": "${this.state.realtime_webhooks}",
"notify_email": "${this.state.notify_email}",
"notify_url": "${this.state.notify_url}",
"daily_emails": "${this.state.daily_emails}",
"monthly_emails": "${this.state.monthly_emails}"

})

`}

                        </PrismCode>
                    }
                </Card>
            </Grid>
        </Grid >
    }

}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    user_id: state.auth.user_id,
    api_keys: state.api_keys.data,
    abi: state.subscriptions.abi,
    networks: state.networks.data,
    subscription: state.subscriptions.detail

})
const mapDispatchToProps = (dispatch) => ({
    createSubscription: (data) => dispatch(createSubscription(data)),
    loadAPIKeyList: (page) => dispatch(loadAPIKeyList(page)),
    getABI: (address) => dispatch(getABI(address)),
    loadNetworkList: (options) => dispatch(loadNetworkList(options)),
    loadSubscriptionDetail: (id) => dispatch(loadSubscriptionDetail(id)),
    clearDetails: () => dispatch({ type: 'CLEAR_SUBSCRIPTION_DETAILS' }),
    archive: (id) => dispatch(archiveSubscription(id)),
    unarchive: (id) => dispatch(unarchiveSubscription(id)),
    editSubscription: (id, data) => dispatch(editSubscription(id, data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubscription);