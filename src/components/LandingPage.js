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
import { Link } from 'react-router-dom';
import WebIcon from '@material-ui/icons/Web';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

class LandingPage extends React.Component {
  state = {
    tab: 0
  }
  render() {
    let heroStyle = {
	background: 'url(/confectionary-blue.png) ' + palette.dark_purple
    }

    return <div className="landingPagebodyComponent">

      <br />
      <div className="hero-image" style={heroStyle}>
        <Grid container>
          <Grid item lg={2}></Grid>
          <Grid item lg={4} md={6} style={{ padding: '2em' }}>

            <div className="hero-text">
              <h1>Ethereum Transaction Notifications for Developers in a Hurry</h1>
              <p style={{ fontSize: 18 }}>TXGun is a SaaS web service for developers to be notified in configurable manners of transactions and events processed on a blockchain.</p>
              <Link to={'/learn_more'}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '1em', marginTop: '2em' }}
                >
                  Learn More
        </Button>
              </Link>
              <Link to={'/registration'}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: '1em', marginTop: '2em' }}
                >
                  Try TXGun Now
        </Button>
              </Link>
            </div>

          </Grid>
          <Grid item lg={4} md={6} style={{ padding: '2em', overflow: 'hidden' }}>

            <AppBar position="static">
              <Tabs value={this.state.tab} onChange={(e, v) => this.setState({ tab: v })} variant='fullWidth'>
                <Tab label="Get Paid" style={{ minWidth: 120 }} />
                <Tab label="Watch Exchanges" style={{ minWidth: 120 }} />
                <Tab label="Method Calls" style={{ minWidth: 120 }} />
              </Tabs>
            </AppBar>
            {this.state.tab === 0 &&
              <PrismCode component="pre" className="language-bash">

                {`curl -XPOST \\
-H "Content-Type: application/json" \\
-H "Authorization: Your API Key Here" \\
-d '{
  "nickname": "Payments to my Store",
  "watched_address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  "realtime_webhooks": "true",
  "notify_url": "myshop.com/payment_received.php",
}' ${baseURL}subscriptions/
`}

              </PrismCode>
            }
            {this.state.tab === 1 &&
              <PrismCode component="pre" className="language-bash">

                {`curl -XPOST \\
-H "Content-Type: application/json" \\
-H "Authorization: Your API Key Here" \\
-d '{
  "nickname": "Watch All Binance Transactions",
  "watched_address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  "daily_emails": "true",
  "notify_email": "competitive.analysis@supertoken.com",
}' ${baseURL}subscriptions/
`}

              </PrismCode>
            }
            {this.state.tab === 2 &&

              <PrismCode component="pre" className="language-bash">

                {`curl -XPOST \\
-H "Content-Type: application/json" \\
-H "Authorization: Your API Key Here" \\
-d '{
  "nickname": "Notify me on DAI Supply Change",
  "watched_address": "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
  "realtime_emails": "true",
  "specific_contract_calls": "mint,burn",
}' ${baseURL}subscriptions/
`}

              </PrismCode>
            }



          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      </div>



      <Grid container>
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
          <div>
            <WebIcon style={{ fontSize: 100 }} />
            <h3>
              For Developers
          </h3>
            <p>
              Simple APIs for you to start integrating with the Ethereum blockchain today.
          </p>
          </div>
        </Grid>
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
          <div>
            <ChildFriendlyIcon style={{ fontSize: 100 }} />
            <h3>
              Easy to Use
          </h3>
            <p>
              Don't install web3, don't run a node, just subscribe.
          </p>
          </div>
        </Grid>
        <Grid item sm={4} style={{ padding: '3em', textAlign: 'center' }}>
          <div>
            <MoneyOffIcon style={{ fontSize: 100 }} />
            <h3>
              Free in Beta
          </h3>
            <p>
              But you can send us beer money!
          </p>
          </div>
        </Grid>
      </Grid>

    </div>

  }
}

export default LandingPage;
