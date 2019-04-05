import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/auth';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Key from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';

export class LoginPage extends Component {

  state = {
    username: null,
    password: null
  }

  OnClickLogin = (e) => {
    e.preventDefault();

    this.props.startLogin(this.state.username, this.state.password);

    // this.props.history.push('/home');

  };

  render() {
    if (this.props.username) {
      console.log('already logged in')
      this.props.history.push('/home');
    }

    return (
      <div className="login-page-class">



        <Paper className="loginPaper">
          <div className="loginheaderpart">
            <Typography variant="display3" gutterBottom className="loginpageheader">
              Login
      </Typography>
          </div>
          <Typography variant="headline" component="h3">
            Login to your account
        </Typography>
          <form onSubmit={this.OnClickLogin}>
            <div className="loginformgroup">

              <AccountCircle />

              <TextField id="input-username" label="Username" onChange={(e) => this.setState({ username: e.target.value })} />

            </div>
            <div className="loginformgroup">



              <Key />

              <TextField type="password" id="input-password" label="Password" onChange={(e) => this.setState({ password: e.target.value })} />

            </div>
            <Typography>{this.props.error ? "Incorrect Username or Password" : null}</Typography>

            <Button type="submit" variant="contained" color="primary" onClick={this.OnClickLogin}><Typography variant="button" gutterBottom className="logintypography">

              Login
      </Typography></Button>
          </form>
        </Paper>
      </div>
    );
  }


}


const mapStateToProps = (state) => ({
  error: state.auth.loginError,
  username: state.auth.username
})

const mapDispatchToProps = (dispatch) => ({
  startLogin: (username, password) => dispatch(login(username, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);