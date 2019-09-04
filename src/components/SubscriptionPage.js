import React from 'react'
import { loadSubscriptionList, pauseSubscription, unpauseSubscription } from '../store/actions/subscriptions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

class SubscriptionPage extends React.Component {
    state = {
      show_archived: false,
      page: 1
    }

    searchOptions () {
      return {
        show_archived: this.state.show_archived,
        page: this.state.page
      }
    }

    loadPage (page) {
      this.props.loadSubscriptionList({
        ...this.searchOptions(),
        page: page
      })
      this.setState({ page: page })
    }

    componentWillMount () {
      this.props.loadSubscriptionList(this.searchOptions())
    }

    toggleArchived () {
      this.setState({ show_archived: !this.state.show_archived })
      this.props.loadSubscriptionList({
        ...this.searchOptions(),
        show_archived: !this.state.show_archived
      })
    }

    render () {
      if (!this.props.subscriptions) { return <Typography>Loading...</Typography> }
      return <React.Fragment>
        <Grid container>
          <Grid item sm xs={12} style={{ marginTop: '1em' }}>
            <Link to={'/'}><Button>Back to Dashboard</Button></Link>

          </Grid>
          <Grid item sm={6} xs={12} style={{ marginBottom: '0.5em', textAlign: 'center' }}>
            <h2>Subscriptions</h2>

          </Grid>
          <Grid item sm xs={4} style={{ marginTop: '1em', textAlign: 'right' }}>
            <Link to="/subscriptions/create">
              <Button>Create</Button></Link>
          </Grid>
          <Grid container>
            <FormControlLabel control={
              <Switch
                onChange={() => this.toggleArchived()}
                value="show_archived"
                color="secondary"
                checked={this.state.show_archived}
              />
            }
            label="Show Archived"
            />
          </Grid>
        </Grid>
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nickname</TableCell>
                <TableCell>Watched Address</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.subscriptions.results.map(subscription => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <Link
                      style={{ color: 'blue' }}
                      to={'/subscriptions/' + subscription.id}
                    >
                      {subscription.nickname}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {subscription.watched_address}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel control={
                      <Switch
                        onChange={() => subscription.status == 'active'
                          ? this.props.pause(subscription.id, this.searchOptions())
                          : this.props.unpause(subscription.id, this.searchOptions())}
                        disabled={subscription.archived_at != null}
                        value="status"
                        color="secondary"
                        checked={subscription.status == 'active'}
                      />
                    }
                    label={capitalize(subscription.status)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Grid container justify="space-between">
          <Grid item>
            <Button color="secondary" disabled={this.props.subscriptions.previous == null}
              onClick={() => this.loadPage(this.state.page - 1)}>Previous Page</Button>
          </Grid>

          <Grid item><Button disabled>Page {this.state.page}</Button></Grid>

          <Grid item>
            <Button color="secondary" disabled={this.props.subscriptions.next == null}
              onClick={() => this.loadPage(this.state.page + 1)}>Next Page</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptions.data
})

const mapDispatchToProps = (dispatch) => ({
  loadSubscriptionList: (options) => dispatch(loadSubscriptionList(options)),
  pause: (id, options) => dispatch(pauseSubscription(id, options)),
  unpause: (id, options) => dispatch(unpauseSubscription(id, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage)
