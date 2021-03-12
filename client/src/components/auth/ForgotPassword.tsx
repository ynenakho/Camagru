import { useRef, useEffect, useState, ComponentType } from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
  InjectedFormProps,
  FormSubmitHandler,
} from 'redux-form';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import renderField from 'components/common/renderField';
import AuthButton from 'components/common/AuthButton';
import * as authActions from 'actions/authActions';
import { ReduxState } from 'reducers';

type Props = ComponentType &
  InjectedFormProps &
  ConnectedProps<typeof connector>;

type FormType = {
  email: string;
};

const ForgotPassword: React.FC<Props> = ({
  forgotPassword,
  handleSubmit,
  submitting,
  error,
  email,
}) => {
  const [modalTrigger, setModalTrigger] = useState<any>(null);
  useEffect(() => {
    setModalTrigger(M.Modal.init(modalRef.current));
  }, []);

  const modalRef = useRef(null);

  const onSubmit: any = (formValues: FormType) =>
    forgotPassword(formValues, () => {
      modalTrigger?.open();
    });

  return (
    <>
      <div className="section section-login">
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel blue darken-2 white-text center">
                <h3>Forgot Password?</h3>
                <h6>Get your new password sent on email</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Field
                    labelColor="white-text"
                    label="Email"
                    icon="email"
                    name="email"
                    type="text"
                    component={renderField}
                  />
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <AuthButton submitting={submitting} name="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>Confirmation</h4>
          <p>New password has been sent to {email}</p>
        </div>
        <div className="modal-footer">
          <Link
            to="/signin"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

const validate = ({ email }: FormType) => {
  // FIX TYPES - CREATE ONE ERROR TYPE
  const errors: FormType = { email: '' };

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const selector = formValueSelector('forgotPassword');

const mapStateToProps = (state: ReduxState) => ({
  // Check if I need to display this error
  // errorMessage: state.auth.errorMessage,
  email: selector(state, 'email'),
});

const connector = connect(mapStateToProps, authActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'forgotPassword', validate })
)(ForgotPassword);
