import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import reduxThunk, { ThunkDispatch } from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import Router from 'Router';
import setAuthToken from 'components/common/setAuthToken';
import { setCurrentUser, signout } from 'actions/authActions';
import { UserType } from 'actions/types';

import reducers from './reducers';
import 'styles/styles.css';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  interface TouchEvent {
    pageX: number;
    pageY: number;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.jwtToken,
      errorMessage: '',
      user: {} as UserType,
    },
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

if (localStorage.jwtToken) {
  const decoded: any = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now();
  const two_hours = 2 * 3600 * 1000;
  // Check for expiration of token (2 hours)
  if (decoded.iat + two_hours < currentTime) {
    console.log('HERE');
    (store.dispatch as ThunkDispatch<{}, {}, AnyAction>)(signout());
    window.location.href = '/signin';
  } else {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    (store.dispatch as ThunkDispatch<{}, {}, AnyAction>)(
      setCurrentUser(localStorage.jwtToken)
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#root')
);
