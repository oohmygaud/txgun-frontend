import React from 'react';
import { loadAPIKeyDetail } from '../store/actions/api_keys';
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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function TransitionLeft(props) {
    return <Slide {...props} direction='left' />;
}

class APIKeyDetail extends React.Component {

    state = {
        hovered: false,
        open: false,
        Transition: null,
        copied: false
    }

    handleClick = Transition => () => {
        this.setState({ open: true, Transition });
        setTimeout(() => {
            this.handleClose()
        }, 2000)
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentWillMount() {
        this.props.loadAPIKeyDetail(this.props.match.params.id)
    }

    render() {
        if (!this.props.api_key)
            return <Typography>Loading...</Typography>
        return <React.Fragment>
            <Grid container>
                <Grid item sm xs={12} style={{ marginTop: '1em' }}>
                    <Link to={'/api_keys'}><Button>Back to API Keys</Button></Link>

                </Grid>
                <Grid item sm={6} xs={12} style={{ marginBottom: '0.5em', textAlign: "center" }}>
                    <h2>{this.props.api_key.nickname}</h2>

                </Grid>
                <Grid item sm></Grid>
            </Grid>
            <Card onMouseEnter={(e) => this.setState({ hovered: true })}
                onMouseLeave={(e) => this.setState({ hovered: false })}
                style={{ textAlign: 'center', paddingTop: '1em', paddingBottom: '1em' }}>
                <h1 >
                    {this.state.hovered ? this.props.api_key.key : '********************************'}
                </h1>
                <CopyToClipboard 
                    text={this.props.api_key.key}
                    onCopy={() => this.setState({ copied: true })}>
                    <Button
                        onClick={this.handleClick(TransitionLeft)}
                        style={{ textAlign: 'center' }}>
                        COPY <FileCopyIcon style={{ marginLeft: '0.3em' }} />
                    </Button>
                </CopyToClipboard>
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.state.Transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Copied</span>}
                />
            </Card>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    api_key: state.api_keys.detail
});

const mapDispatchToProps = (dispatch) => ({
    loadAPIKeyDetail: (id) => dispatch(loadAPIKeyDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(APIKeyDetail);