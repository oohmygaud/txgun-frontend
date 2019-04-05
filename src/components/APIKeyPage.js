import React from 'react';
import { loadAPIKeyList } from '../store/actions/api_keys';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TimeAgo from 'timeago-react';

class APIKeyPage extends React.Component {

    state = {
        page: 1
    }

    loadPage(page) {
        this.props.loadAPIKeyList(page)
        this.setState({ page: page })
    }

    componentWillMount() {
        this.props.loadAPIKeyList()
    }
    render() {
        if (!this.props.api_keys)
            return <Typography>Loading...</Typography>
        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                <Link to={'/'}><Button>Back to Dashboard</Button></Link>
                    
                </Grid>
                <Grid item sm={6} xs={12} style={{ marginBottom: '0.5em', textAlign:"center" }}>
                <h2>API Keys</h2>
                    
                </Grid>
                <Grid item sm xs={4} style={{ marginTop: '1em', textAlign:"right" }}>
                <Link to="/api_keys/create">
                        <Button>Create</Button></Link>
                </Grid>
            </Grid>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.api_keys.results.map(api_key => (
                            <TableRow key={api_key.id}>
                                <TableCell>
                                <Link to={'/api_keys/' + api_key.id}>{api_key.nickname}</Link>
                                </TableCell>
                                <TableCell><TimeAgo datetime={api_key.created_at} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Grid container justify="space-between">
                <Grid item>
                    <Button color="secondary" disabled={this.props.api_keys.previous == null}
                        onClick={(e) => this.loadPage(this.state.page - 1)}>Previous Page</Button>
                </Grid>


                <Grid item><Button disabled>Page {this.state.page}</Button></Grid>

                <Grid item>
                    <Button color="secondary" disabled={this.props.api_keys.next == null}
                        onClick={(e) => this.loadPage(this.state.page + 1)}>Next Page</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    api_keys: state.api_keys.data
});

const mapDispatchToProps = (dispatch) => ({
    loadAPIKeyList: (page) => dispatch(loadAPIKeyList(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(APIKeyPage);