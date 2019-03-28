import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const StatCard = (props) => {
    return <Grid item xs={6} sm={3} style={{ marginTop: 10 }}>
        <Card style={{height: 125}}>
            <CardHeader title={
                props.precision ?
                Number.parseFloat(props.value).toFixed(props.precision)
                : props.value
            } style={{textAlign: 'center', padding: '32px 0 0 0'}}></CardHeader>
            <CardContent style={{textAlign: 'center', color: 'grey', fontSize: '0.9em'}}>{ props.title }</CardContent>
        </Card>
    </Grid>

}
export default StatCard;