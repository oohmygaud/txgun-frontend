import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { loadDashboard } from '../store/actions/dashboard'
import { connect } from 'react-redux'
import StatCard from './StatCard'
import TransactionTable from './TransactionTable'

class HomePage extends React.Component {
  UNSAFE_componentWillMount () {
    this.props.loadDashboard()
  }

  render () {
    console.log('Dashboard data', this.props.dashboard)
    if (!this.props.dashboard) { return <Typography>Loading...</Typography> }

    return <React.Fragment>

      <Grid container spacing={16} >
        <StatCard title='Active Subscriptions' value={this.props.dashboard.active_subscriptions} />
        <StatCard title='Transactions Today' value={this.props.dashboard.transactions_today} />
        <StatCard title='Ether Today' value={this.props.dashboard.total_ether / 10E18} precision={4} />
        <StatCard title='Tokens Today' value={this.props.dashboard.total_tokens} precision={4} />
        <TransactionTable transactions={this.props.dashboard.transactions} show_pricing_info />
      </Grid>

    </React.Fragment>
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.data
})

const mapDispatchToProps = (dispatch) => ({
  loadDashboard: () => dispatch(loadDashboard())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
