import thunk from 'redux-thunk'
import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import authReducer from '../reducers/auth'
import dashboardReducer from '../reducers/dashboard'
import subscriptionReducer from '../reducers/subscriptions'
import apiKeyReducer from '../reducers/api_keys'
import apiCreditReducer from '../reducers/api_credits'
import networkReducer from '../reducers/networks'
import authSaga from '../sagas/auth'
import dashboardSaga from '../sagas/dashboard'
import subscriptionSaga from '../sagas/subscriptions'
import apiKeySaga from '../sagas/api_keys'
import apiCreditSaga from '../sagas/api_credits'
import networkSaga from '../sagas/networks'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export default (history) => {
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      auth: authReducer,
      dashboard: dashboardReducer,
      subscriptions: subscriptionReducer,
      api_keys: apiKeyReducer,
      api_credits: apiCreditReducer,
      networks: networkReducer
    }),
    composeEnhancers(applyMiddleware(thunk),
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history)))
  )

  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(dashboardSaga)
  sagaMiddleware.run(subscriptionSaga)
  sagaMiddleware.run(apiKeySaga)
  sagaMiddleware.run(apiCreditSaga)
  sagaMiddleware.run(networkSaga)

  return store
}
