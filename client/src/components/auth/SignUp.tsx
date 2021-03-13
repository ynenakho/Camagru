import { useState, ComponentType } from 'react';
import { reduxForm, Field, reset, InjectedFormProps } from 'redux-form';
import { compose, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { RouteComponentProps } from 'react-router-dom';
import inputField from '../common/InputField';
import AuthButton from '../common/AuthButton';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';

type Props = ComponentType &
  InjectedFormProps &
  ConnectedProps<typeof connector> &
  RouteComponentProps;

type FormType = {
  username: string;
  email: string;
  password: string;
};

const SignUp: React.FC<Props> = ({
  handleSubmit,
  submitting,
  error,
  signup,
  history,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClose = () => {
    toggleModal();
    history.push('/signin');
  };

  const onSubmit: any = (formValues: FormType) => {
    return signup(formValues, () => {
      toggleModal();
    });
  };

  return (
    <>
      <div className="section">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Username"
            icon="account_box"
            name="username"
            type="text"
            component={inputField}
          />
          <Field
            label="Email"
            icon="email"
            name="email"
            type="text"
            component={inputField}
          />
          <Field
            label="Password"
            icon="lock"
            name="password"
            type="password"
            component={inputField}
          />
          {error && <div className="error-message">{error}</div>}
          <div className="signup-buttons-wrapper">
            <AuthButton submitting={submitting} name="sign up" />
          </div>
        </form>
      </div>
      <Modal title="Almost there!" onClose={onClose} show={showModal}>
        <p>
          Check your email and follow the instructions to validate your account
        </p>
      </Modal>
    </>
  );
};

const validate = ({ username, email, password }: FormType) => {
  const errors: FormType = { username: '', email: '', password: '' };

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Password field is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!username) {
    errors.username = 'Username field is required';
  } else if (username.length < 4 || username.length > 15) {
    errors.username = 'Username must be between 4 and 15 characters';
  }
  return errors;
};

const mapStateToProps = (state: ReduxState) => ({
  errorMessage: state.auth.errorMessage,
});
const afterSubmit = (result: any, dispatch: Dispatch) =>
  dispatch(reset('signUp'));

const connector = connect(mapStateToProps, authActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'signUp', validate, onSubmitSuccess: afterSubmit })
)(SignUp);
