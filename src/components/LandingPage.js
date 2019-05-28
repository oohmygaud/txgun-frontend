import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import palette from '../theme/palette'
import PrismCode from 'react-prism';
import { baseURL } from '../store/api';
import Card from '@material-ui/core/Card';
require('prismjs');
require('prismjs/components/prism-bash')
require('prismjs/themes/prism-okaidia.css');

const LandingPage = () => (
  <div className="landingPagebodyComponent">

    <br />
    <div className="hero-image" style={{ background: palette.dark_purple }}>
      <Grid container>
        <Grid item md={6} style={{ padding: '2em' }}>

          <div className="hero-text">
            <h1>Notification Service for Developers</h1>
            <p>TXGun is a SaaS web service for developers to be notified in configurable manners of transactions and events processed on a blockchain.</p>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '1em' }}
            >
              Learn More
        </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: '1em' }}
            >
              Register
        </Button>
          </div>

        </Grid>
        <Grid item md={6} style={{ padding:'2em' }}>
        
        <PrismCode component="pre" className="language-bash">

{`curl -XPOST \\
-H "Content-Type: application/json" \\
-H "Authorization: Your API Key Here" \\
-d '{
"nickname": "Watch All Binance Transactions",
"watched_address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
"daily_emails": "true",
"notify_email": "accounting@example.com",
"realtime_webhooks": "true",
"notify_url": "mysite.com/payment_received.php",
}' ${baseURL}subscriptions/
`}

</PrismCode>

        </Grid>
      </Grid>
    </div>



    <Grid container>
      <Grid item sm={4} style={{ padding: '3em' }}>
        <div>
          <h3>
            Here is some information on why you should use our service.
          </h3>
        </div>
      </Grid>
      <Grid item sm={4} style={{ padding: '3em' }}>
        <div>
          <h3>
            Here is some information on why you should use our service.
          </h3>
        </div>
      </Grid>
      <Grid item sm={4} style={{ padding: '3em' }}>
        <div>
          <h3>
            Here is some information on why you should use our service.
          </h3>
        </div>
      </Grid>
    </Grid>

  </div>
);

export default LandingPage;