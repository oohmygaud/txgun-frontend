import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentWrapper from '../components/ContentWrapper';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const PrivateComponent = (props) => {
    if (isAuthenticated)
      return (
        <div>
          <Header />

          <ContentWrapper>
            <Component {...props} />
          </ContentWrapper>


          <Footer />
        </div>
      )
    else
      return (
        <div>
          <Header />
          <h3>You are not logged in</h3>
        </div>
      )

  }
  return <Route {...rest} component={PrivateComponent} />
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.username
});

export default connect(mapStateToProps)(PrivateRoute);
