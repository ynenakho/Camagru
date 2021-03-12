import { useRef, useEffect, useState, ComponentType } from 'react';
import {
  reduxForm,
  Field,
  reset,
  FormSubmitHandler,
  InjectedFormProps,
} from 'redux-form';
import { compose, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import * as authActions from '../../actions/authActions';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import renderField from '../common/renderField';
import AuthButton from '../common/AuthButton';
import { ReduxState } from 'reducers';

type Props = ComponentType &
  InjectedFormProps &
  ConnectedProps<typeof connector>;

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
}) => {
  const [modalTrigger, setModalTrigger] = useState<any>(null);

  useEffect(() => {
    setModalTrigger(M.Modal.init(modalRef.current));
  }, []);

  const modalRef = useRef(null);

  const onSubmit: any = (formValues: FormType) => {
    return signup(formValues, () => {
      modalTrigger.open();
    });
  };

  return (
    <>
      <div className="section section-signup">
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel blue darken-2 white-text center">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Field
                    labelColor="white-text"
                    label="Username"
                    icon="account_box"
                    name="username"
                    type="text"
                    component={renderField}
                  />
                  <Field
                    labelColor="white-text"
                    label="Email"
                    icon="email"
                    name="email"
                    type="text"
                    component={renderField}
                  />
                  <Field
                    labelColor="white-text"
                    label="Password"
                    icon="lock"
                    name="password"
                    type="password"
                    component={renderField}
                  />
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <AuthButton submitting={submitting} name="sign up" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>Almost there!</h4>
          <p>
            Check your email and follow the instructions to validate your
            account
          </p>
        </div>
        <div className="modal-footer">
          <Link
            to="/signin"
            className="modal-close waves-effect waves-green btn-flat"
          >
            OK
          </Link>
        </div>
      </div>
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
