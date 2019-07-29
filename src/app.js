import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import HeaderAppBar from './components/Header';
import AppRouter from './routers/AppRouter';
import './styles/styles.css';
import { theme } from './theme/theme';
import configureStore from './store/config/configureStore';
import { getProfile } from './store/actions/auth';
import { createBrowserHistory } from 'history'

require("babel-core/register");
require("babel-polyfill");

export const history = createBrowserHistory()

const store = configureStore(history);
store.subscribe(() => {
  console.log("New redux state:", store.getState());
});



const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRouter history={history} />
    </MuiThemeProvider>
  </Provider>
);

if (localStorage.getItem('authToken')) {
  store.dispatch(getProfile());
}



render(<App />, document.getElementById('app'));