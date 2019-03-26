import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import dashboardReducer from '../reducers/dashboard';
import subscriptionReducer from '../reducers/subscriptions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import createSagaMiddleware from "redux-saga";
import authSaga from "../sagas/auth";
import dashboardSaga from "../sagas/dashboard";
import subscriptionSaga from "../sagas/subscriptions";

const sagaMiddleware = createSagaMiddleware()

export default () => {
  const store = createStore(
    combineReducers({

      auth: authReducer,
      dashboard: dashboardReducer,
      subscriptions: subscriptionReducer
    }),
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(dashboardSaga)
  sagaMiddleware.run(subscriptionSaga)

  return store;
};



