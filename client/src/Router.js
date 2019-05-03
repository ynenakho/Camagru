import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './components/Landing';
import App from './components/App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import Settings from './components/Settings';
import MakePicture from './components/MakePicture';
import ForgotPassword from './components/auth/ForgotPassword';
import PrivateRoute from './components/common/PrivateRoute';

export class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route path="/" exact component={Landing} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signout" component={SignOut} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/picture" component={MakePicture} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
