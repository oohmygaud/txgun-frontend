import React from 'react'
import { register } from '../store/actions/auth'
import FormControl from '@material-ui/core/FormControl'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Registration extends React.Component {
  OnSubmit = (e) => {
    e.preventDefault()
    const form_data = { ...this.state }

    console.log('Registering', form_data)
    this.props.register(form_data.username, form_data.email, form_data.password, form_data.password_confirm)
  };

  showErrors(name) {
    return (this.props.errors && this.props.errors[name] &&
      this.props.errors[name].map(error => (
        <div value={error} key={error}>
          <em>{error}</em>
        </div>
      )))
  }

  render() {
    return <React.Fragment>
      <Grid container justify='center'>
        <Grid item sm={6} md={4} lg={3}>
          <Card style={{ margin: '1em', padding: '1em' }}>
            <form onSubmit={this.onSubmit}>
              <FormControl fullWidth>
                <TextField id="email"
                  label="Email"
                  margin="normal"
                  onChange={(e) => this.setState({ email: e.target.value })} />
              </FormControl>
              {this.showErrors('email')}
              <FormControl fullWidth>
                <TextField id="username"
                  label="Username"
                  margin="normal"
                  onChange={(e) => this.setState({ username: e.target.value })} />
              </FormControl>
              {this.showErrors('username')}
              <FormControl fullWidth>
                <TextField id="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  onChange={(e) => this.setState({ password: e.target.value })} />
              </FormControl>
              {this.showErrors('password')}
              <FormControl fullWidth>
                <TextField id="password_confirm"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  onChange={(e) => this.setState({ password_confirm: e.target.value })} />
              </FormControl>
              {this.showErrors('password_confirm')}
              {this.showErrors('non_field_errors')}
              <FormControl>
              <Button type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                onClick={this.OnSubmit}>
                Register
            </Button>
            </FormControl>
            </form>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.registration_errors
})

const mapDispatchToProps = (dispatch) => ({
  register: (username, email, password, password_confirm) => dispatch(register(username, email, password, password_confirm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
