import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Router from './Router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import setAuthToken from './components/common/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import reducers from './reducers';

const storeInitState = {
  auth: {
    authenticated: localStorage.getItem('jwtToken')
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  storeInitState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser());
}

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#root')
);

serviceWorker.unregister();
