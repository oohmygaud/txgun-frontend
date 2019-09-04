import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import './styles/styles.css'
import { theme } from './theme/theme'
import configureStore from './store/config/configureStore'
import { getProfile } from './store/actions/auth'
import { createBrowserHistory } from 'history'
/* global require */
require('babel-core/register')
require('babel-polyfill')

export const history = createBrowserHistory()

const store = configureStore(history)
store.subscribe(() => {
  console.log('New redux state:', store.getState())
})

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRouter history={history} />
    </MuiThemeProvider>
  </Provider>
)

if (localStorage.getItem('authToken')) {
  store.dispatch(getProfile())
}

render(<App />, document.getElementById('app'))
