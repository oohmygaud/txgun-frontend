import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CreditTable from './CreditTable';
import { loadAPICredits, loadCreditBalance } from '../store/actions/api_credits'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class APICreditPage extends React.Component {
    componentWillMount() {
        this.props.loadAPICredits(),
        this.props.loadCreditBalance()
    }

    render() {
        if (!this.props.api_credits)
            return <Typography>Loading...</Typography>
        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/'}><Button>Back to Dashboard</Button></Link>

                </Grid>
                <Grid item sm={6} xs={12} style={{ marginBottom: '0.5em', textAlign: "center" }}>
                    <h2>API Credits</h2>

                </Grid>
                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: "right" }}>

                </Grid>
            </Grid>
            <Card>
                <h3>Available Credits: {this.props.api_credit_balance}</h3>
            </Card>
            <Grid container spacing={24}>
                <CreditTable api_credits={this.props.api_credits}/>
            </Grid>
        </React.Fragment>
    }
}


const mapStateToProps = (state) => ({
    api_credits: state.api_credits.data,
    api_credit_balance: state.api_credits.balance
});

const mapDispatchToProps = (dispatch) => ({
    loadAPICredits: () => dispatch(loadAPICredits()),
    loadCreditBalance: () => dispatch(loadCreditBalance())
});

export default connect(mapStateToProps, mapDispatchToProps)(APICreditPage);