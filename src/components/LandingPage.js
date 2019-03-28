import React from 'react';
import Header from './Header';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import {Link} from 'react-router-dom';
import gun from '../assets/img/gun5.png';


const LandingPage = () => (
  <div className="landingPagebodyComponent">

<br/>
<Typography variant="display3" gutterBottom align="center">
        Welcome to TX Gun
      </Typography>
    
   <Grid container spacing={24} >
        <Grid item xs={12} md={12}>
          <Typography variant="body2" gutterBottom align="center">
          TXGun is a SaaS web service for developers to be notified in configurable manners of transactions and events processed on a blockchain.
      </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom align="left" style={{paddingLeft:20}}>
        {`
         Integrating blockchain technology and cryptography components is highly complicated and a barrier to entry for adoption into blockchain ecosystems for small and medium companies that just need to be notified of payments or changes to a blockchain. Our goal is to design an easy-to-use system, billed on API Credits, for consuming and processing transactions from various blockchains to be forwarded as formatted emails, webhooks, websockets, or summary reports.
        `}
        <Link to="/start"> <Button color="primary"  align="left" style={{marginLeft:20}}>
        Get Started
      </Button></Link>

       <Button color="primary"  align="left" style={{marginLeft:20}}>
        Know More
      </Button>
      </Typography>
        </Grid>
         <Grid item xs={6}>
         <img src={gun} alt="Gun" style={{height:'100%', width:'100%'}}/>
        </Grid>
        
        </Grid>

     <Grid container spacing={24} >
        <Grid item xs={12} md={12}>

          </Grid>
          </Grid>

  </div>
);

export default LandingPage;