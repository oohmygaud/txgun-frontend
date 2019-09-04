import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { getProfile, editProfile } from '../store/actions/auth'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class ProfilePage extends React.Component {
    state = {
      disable_balance_warning_emails: false
    }

    UNSAFE_componentWillMount () {
      this.props.getProfile(this.props.match.params.id)
    }

    OnSubmit = (e) => {
      e.preventDefault()
      const form_data = { ...this.props.user, ...this.state }

      console.log('Editing', form_data)
      this.props.editProfile(form_data)
    };

    UNSAFE_componentWillReceiveProps (nextProps) {
      if (nextProps.user) {
        console.log('Setting values', nextProps.user)
        this.setState({
          email: nextProps.user.email,
          first_name: nextProps.user.first_name,
          last_name: nextProps.user.last_name,
          default_notify_url: nextProps.user.default_notify_url,
          disable_balance_warning_emails: nextProps.user.disable_balance_warning_emails
        })
      }
    }

    render () {
      console.log('rendering', this.state)
      if (!this.props.user) { return <Typography>Loading...</Typography> }

      return <React.Fragment>
        <Card>
          <h1>
                    User Settings:
          </h1>
          <form>
            <FormGroup row>
              <TextField id="username"
                label="Username"
                defaultValue={this.props.user.username}
                disabled />
            </FormGroup>
            <FormGroup row>
              <TextField id="email"
                label="Email"
                defaultValue={this.props.user.email}
                onChange={(e) => this.setState({ email: e.target.value })} />
            </FormGroup>
            <FormGroup row>
              <TextField id="first_name"
                label="First Name"
                defaultValue={this.props.user.first_name}
                onChange={(e) => this.setState({ first_name: e.target.value })} />
            </FormGroup>
            <FormGroup row>
              <TextField id="last_name"
                label="Last Name"
                defaultValue={this.props.user.last_name}
                onChange={(e) => this.setState({ last_name: e.target.value })} />
            </FormGroup>
            <FormGroup row>
              <TextField id="default_notify_url"
                label="Notify URL"
                defaultValue={this.props.user.default_notify_url}
                onChange={(e) => this.setState({ default_notify_url: e.target.value })} />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel control={
                <Switch
                  onChange={(e) => this.setState({ disable_balance_warning_emails: e.target.checked })}
                  value="disable_balance_warning_emails"
                  color="primary"
                  checked={this.state.disable_balance_warning_emails}
                />
              }
              label={this.state.disable_balance_warning_emails
                ? 'Enable Low Credit Balance Emails' : 'Disable Low Credit Balance Emails'}
              />
            </FormGroup>

            <Button
              style={{ marginRight: '1em', marginTop: '1em' }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.OnSubmit}>
                        Update
            </Button>
          </form>
        </Card>
      </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
  editProfile: (data) => dispatch(editProfile(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
