import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';

import Router from './Router';
import setAuthToken from './components/common/setAuthToken';
import { setCurrentUser, signout } from './actions/authActions';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.jwtToken } },
  composeEnhancers(applyMiddleware(reduxThunk))
);

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now();
  const two_hours = 2 * 3600 * 1000;
  // Check for expiration of token (2 hours)
  if (decoded.iat + two_hours < currentTime) {
    console.log('HERE');
    store.dispatch(signout());
    window.location.href = '/signin';
  } else {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(localStorage.jwtToken));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#root')
);

serviceWorker.unregister();
