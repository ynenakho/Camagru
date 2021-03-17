import { useState, FC, ComponentType } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import InputField from '../common/InputField';
import * as authActions from '../../actions/authActions';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';
import AuthButton from 'components/common/AuthButton';

type Props = ComponentType &
  ConnectedProps<typeof connector> &
  InjectedFormProps;

type FormType = {
  username: string;
  email: string;
  newPassword: string;
  oldPassword: string;
};

const Settings: FC<Props> = ({
  updateProfile,
  handleSubmit,
  submitting,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit: any = (formValues: FormType) => {
    return updateProfile(formValues, () => {
      toggleModal();
    });
  };

  const checkBox = ({ input }: any) => (
    <div>
      <label>
        <input
          {...input}
          checked={input.value}
          type="checkbox"
          className="left"
        />
        <span className="blue-text">
          Get notified on new comments of your pictures
        </span>
      </label>
    </div>
  );

  return (
    <>
      <div className="section">
        <h1>Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            icon="account_box"
            name="username"
            type="text"
            component={InputField}
          />
          <Field icon="email" name="email" type="text" component={InputField} />
          <Field
            label="New Password"
            icon="lock"
            name="newPassword"
            type="password"
            component={InputField}
          />
          <Field
            label="Old Password"
            icon="lock"
            name="oldPassword"
            type="password"
            component={InputField}
          />
          <Field name="getNotified" id="getNotified" component={checkBox} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className="signup-buttons-wrapper">
            <AuthButton submitting={submitting} name="Submit" />
          </div>
        </form>
      </div>
      <Modal title="Confirmation" onClose={toggleModal} show={showModal}>
        <p>Your settings are updated</p>
      </Modal>
    </>
  );
};

const validate = ({ username, email, newPassword, oldPassword }: FormType) => {
  const errors: FormType = {
    username: '',
    email: '',
    newPassword: '',
    oldPassword: '',
  };

  if (newPassword && newPassword.length < 6) {
    errors.newPassword = 'New Password must be at least 6 characters';
  }
  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!oldPassword) {
    errors.oldPassword = 'Old Password field is required to confirm changes';
  }
  if (!username) {
    errors.username = 'Username field is required';
  } else if (username.length < 4 || username.length > 15) {
    errors.username = 'Username must be between 4 and 15 characters';
  }
  return errors;
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth.authenticated,
  user: state.auth.user,
  initialValues: state.auth.user,
  errorMessage: state.auth.errorMessage,
});

const connector = connect(mapStateToProps, authActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'settings', validate })
)(Settings);