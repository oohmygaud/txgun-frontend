import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const StatCard = (props) => {
    return <Grid item xs={6} sm={3} style={{ marginTop: 10 }}>
        <Card> 
            <CardHeader title={ props.value } style={{textAlign: 'center'}}></CardHeader>
            <CardContent style={{textAlign: 'center'}}>{ props.title }</CardContent>
        </Card>
    </Grid>

}
export default StatCard;