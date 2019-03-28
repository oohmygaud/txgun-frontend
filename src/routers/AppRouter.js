import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import AboutPage from '../components/AboutPage';
import HomePage from '../components/HomePage';
import ContactPage from '../components/ContactPage';
import FAQPage from '../components/FAQPage';
import NotFoundPage from '../components/NotFoundPage';

import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';
import LoginPage from '../components/LoginPage';
import GetStartedPage from '../components/GetStartedPage';
import FormsPage from '../components/FormsPage';
import SubscriptionPage from '../components/SubscriptionPage';
import SubscriptionDetailPage from '../components/SubscriptionDetailPage';
import CreateSubscription from '../components/CreateSubscriptionPage';
import EditSubscription from '../components/EditSubscriptionPage';
import { ConnectedRouter } from 'connected-react-router'





const AppRouter = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
      
      <Switch>
        
        <PublicRoute path="/" component={LandingPage} exact={true} />
         <PrivateRoute path="/home" component={HomePage} />
         <PrivateRoute path="/subscriptions/:id/edit" component={EditSubscription} />
         <PrivateRoute path="/subscriptions/create" component={CreateSubscription} />
         <PrivateRoute path="/subscriptions/:id" component={SubscriptionDetailPage} />
         <PrivateRoute path="/subscriptions" component={SubscriptionPage} />
         
       
        <Route path="/login" component={LoginPage}  />
        <PublicRoute path="/about" component={AboutPage} />
         
        <Route component={NotFoundPage} />
      </Switch>
      
    </div>
  </ConnectedRouter>
);

export default AppRouter;