import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentWrapper from '../components/ContentWrapper';
import { doRefreshToken } from '../store/actions/auth';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  class PrivateComponent extends React.Component {

    refreshToken() {
      const tokensCreated = localStorage.getItem('tokensCreated')
      if (!tokensCreated) {
        console.log("missing tokens created setting, we should log you out here")
        return
      }
      const createdAt = new Date(tokensCreated)
      const expiredAt = new Date(createdAt.getTime() + 120 * 1000)
      const now = new Date();
      if (expiredAt <= now) {
        this.props.doRefreshToken()

      }
    }

    componentDidMount() {
      this.refreshToken()
      this.timer = setInterval(() => this.refreshToken(), 15 * 1000)
    }

    componentWillUnmount() {
      clearInterval(this.timer)
    }

    render() {
      if (isAuthenticated)
        return (
          <div>
            <Header />

            <ContentWrapper>
              <Component {...this.props} />
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
  }

  const mapDispatchToProps = (dispatch) => ({
    doRefreshToken: () => dispatch(doRefreshToken())
  });
  const ConnectedPrivateComponent = connect(null, mapDispatchToProps)(PrivateComponent)
  return <Route {...rest} component={ConnectedPrivateComponent} />
};


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.username
});


export default connect(mapStateToProps)(PrivateRoute);
