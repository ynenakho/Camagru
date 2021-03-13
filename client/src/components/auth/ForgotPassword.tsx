import { useState, ComponentType } from 'react';
import {
  reduxForm,
  Field,
  formValueSelector,
  InjectedFormProps,
} from 'redux-form';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import renderField from 'components/common/InputField';
import AuthButton from 'components/common/AuthButton';
import * as authActions from 'actions/authActions';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';

type Props = ComponentType &
  InjectedFormProps &
  ConnectedProps<typeof connector> &
  RouteComponentProps;

type FormType = {
  email: string;
};

const ForgotPassword: React.FC<Props> = ({
  forgotPassword,
  handleSubmit,
  submitting,
  error,
  email,
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

  const onSubmit: any = (formValues: FormType) =>
    forgotPassword(formValues, () => {
      toggleModal();
    });

  return (
    <>
      <div className="section">
        <h1>Forgot Password?</h1>
        <h4>Get your new password sent on email</h4>
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
          <div className="signup-buttons-wrapper">
            <AuthButton submitting={submitting} name="submit" />
          </div>
        </form>
      </div>
      <Modal title="Confirmation" onClose={onClose} show={showModal}>
        <p>New password has been sent to {email}</p>
      </Modal>
    </>
  );
};

const validate = ({ email }: FormType) => {
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
  email: selector(state, 'email'),
});

const connector = connect(mapStateToProps, authActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'forgotPassword', validate })
)(ForgotPassword);
