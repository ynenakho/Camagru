import { ComponentType } from 'react';
import { reduxForm, Field, reset, InjectedFormProps } from 'redux-form';
import { compose, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import renderField from '../common/InputField';
import AuthButton from '../common/AuthButton';
import * as authActions from '../../actions/authActions';
import { ReduxState } from 'reducers';

type Props = ComponentType &
  InjectedFormProps &
  ConnectedProps<typeof connector> &
  RouteComponentProps;

type FormType = {
  username: string;
  password: string;
};

const SignIn: React.FC<Props> = ({
  handleSubmit,
  submitting,
  error,
  signin,
  history,
}) => {
  const onSubmit: any = (formValues: FormType) => {
    return signin(formValues, () => {
      history.push('/');
    });
  };

  return (
    <div className="section">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="Username"
          icon="account_box"
          name="username"
          type="text"
          component={renderField}
        />
        <Field
          label="Password"
          icon="lock"
          name="password"
          type="password"
          component={renderField}
        />
        {error && <div className="error-message">{error}</div>}
        <div className="signin-buttons-wrapper">
          <AuthButton submitting={submitting} name="Login" />
          <Link to="/forgotpassword" className="btn auth-btn-grey">
            Forgot Password
          </Link>
        </div>
      </form>
    </div>
  );
};

const validate = ({ username, password }: FormType) => {
  const errors: FormType = { password: '', username: '' };

  if (!password) {
    errors.password = 'Password field is required';
  }
  if (!username) {
    errors.username = 'Username field is required';
  }
  return errors;
};

const mapStateToProps = (state: ReduxState) => ({
  errorMessage: state.auth.errorMessage,
});

const afterSubmit = (result: any, dispatch: Dispatch) =>
  dispatch(reset('signIn'));

const connector = connect(mapStateToProps, authActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'signIn', validate, onSubmitSuccess: afterSubmit })
)(SignIn);
