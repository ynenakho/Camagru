import { BrowserRouter, Route } from 'react-router-dom';

import Landing from 'components/Landing/Landing';
import App from 'components/App';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';
import SignOut from 'components/auth/SignOut';
import Settings from 'components/Settings/Settings';
import TakePicture from 'components/takePicture/TakePicture';
import ForgotPassword from 'components/auth/ForgotPassword';
import PrivateRoute from 'components/common/PrivateRoute';
import ScrollToTop from 'components/common/ScrollToTop';

const Router: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App>
      <Route path="/" exact component={Landing} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signout" exact component={SignOut} />
      <Route path="/forgotpassword" exact component={ForgotPassword} />
      <PrivateRoute path="/settings" exact component={Settings} />
      <PrivateRoute path="/picture" exact component={TakePicture} />
    </App>
  </BrowserRouter>
);

export default Router;
