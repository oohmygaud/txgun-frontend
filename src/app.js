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
require("babel-core/register");
require("babel-polyfill");

const store = configureStore();
store.subscribe(() => {
  console.log("New state:", store.getState());
});



const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

if (localStorage.getItem('authToken')) {
  store.dispatch(getProfile());
}



render(<App />, document.getElementById('app'));