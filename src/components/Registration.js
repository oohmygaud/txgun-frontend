import React from 'react';
import { register } from '../store/actions/auth';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Registration extends React.Component {

    OnSubmit = (e) => {
        e.preventDefault();
        const form_data = { ...this.state, };

        console.log('Registering', form_data)
        this.props.register(form_data.username, form_data.email, form_data.password, form_data.password_confirm);
    };

    showErrors(name) {
        return (this.props.errors && this.props.errors[name] && 
         this.props.errors[name].map(error=> (
            <div value={error} key={error}>
                <em>{error}</em>
            </div> 
        )))
    }

    render() {
        return <React.Fragment>
            <Card>
                <form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <TextField id="email"
                            label="Email"
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </FormGroup>
                    {this.showErrors('email')}
                    <FormGroup row>
                        <TextField id="username"
                            label="Username"
                            onChange={(e) => this.setState({ username: e.target.value })} />
                    </FormGroup>
                    {this.showErrors('username')}
                    <FormGroup row>
                        <TextField id="password"
                            label="Password"
                            type="password"
                            onChange={(e) => this.setState({ password: e.target.value })} />
                    </FormGroup>
                    {this.showErrors('password')}
                    <FormGroup row>
                        <TextField id="password_confirm"
                            label="Confirm Password"
                            type="password"
                            onChange={(e) => this.setState({ password_confirm: e.target.value })} />
                    </FormGroup>
                    {this.showErrors('password_confirm')}
                    {this.showErrors('non_field_errors')}
                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.OnSubmit}>
                            <Typography variant="button" gutterBottom className="logintypography">
                                Register
                            </Typography>
                        </Button>
                </form>
            </Card>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    errors: state.auth.registration_errors
})

const mapDispatchToProps = (dispatch) => ({
    register: (username, email, password, password_confirm) => dispatch(register(username, email, password, password_confirm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
