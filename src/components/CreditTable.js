import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TimeAgo from 'timeago-react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';


class CreditTable extends React.Component {
    render() {
        console.log(this.props)
        return <Grid item xs={12}>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.api_credits.results.map(api_credit=> (
                            <TableRow key={api_credit.id}>
                                <TableCell>
                                    <TimeAgo datetime={api_credit.created_at} />
                                </TableCell>
                                <TableCell>
                                    {api_credit.description}
                                </TableCell>
                                <TableCell>
                                    {api_credit.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Grid>
    }
}

export default CreditTable;