import { useState, FC, ChangeEvent, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import InputField from '../common/InputField';
import * as authActions from '../../actions/authActions';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';
import AuthButton from 'components/common/AuthButton';

type Props = ConnectedProps<typeof connector>;

type FormType = {
  id: string;
  username: string;
  email: string;
  newPassword: string;
  oldPassword: string;
  getNotified: boolean;
};

const INITIAL_FORM = {
  id: '',
  username: '',
  email: '',
  newPassword: '',
  oldPassword: '',
  getNotified: false,
};

const Settings: FC<Props> = ({
  updateProfile,
  clearErrors,
  errorMessage,
  initialValues,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_FORM);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setForm({ ...INITIAL_FORM, ...initialValues });
    return clearErrors;
  }, [clearErrors, setForm, initialValues]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    await updateProfile(form, () => {
      toggleModal();
    });
    setSubmitting(false);
  };

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    if (errorMessage) clearErrors();
  };

  const handleSubmit = () => {
    const _errors = validate(form);

    if (!Object.values(_errors).every((value) => !value)) {
      setErrors(_errors);
      return;
    }
    onSubmit();
  };

  return (
    <>
      <div className="section">
        <h1>Settings</h1>
        <div>
          <InputField
            label="Username"
            icon="account_box"
            name="username"
            type="text"
            value={form.username}
            onChange={onChange}
            error={errors.username}
          />
          <InputField
            label="Email"
            icon="email"
            name="email"
            type="text"
            value={form.email}
            onChange={onChange}
            error={errors.email}
          />
          <InputField
            label="New Password"
            icon="lock"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={onChange}
            error={errors.newPassword}
          />
          <InputField
            label="Old Password"
            icon="lock"
            name="oldPassword"
            type="password"
            value={form.oldPassword}
            onChange={onChange}
            error={errors.oldPassword}
          />
          <div>
            <input
              type="checkbox"
              name="getNotified"
              id="getNotified"
              checked={form.getNotified}
              onChange={onCheckboxChange}
              className="checkbox"
            />
            <span className="blue-text">
              Get notified on new comments of your pictures
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="signup-buttons-wrapper">
            <AuthButton
              submitting={submitting}
              name="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Modal title="Confirmation" onClose={toggleModal} show={showModal}>
        <p>Your settings are updated</p>
      </Modal>
    </>
  );
};

const validate = ({ username, email, newPassword, oldPassword }: FormType) => {
  const errors: FormType = {
    id: '',
    username: '',
    email: '',
    newPassword: '',
    oldPassword: '',
    getNotified: false,
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
  initialValues: state.auth.user,
  errorMessage: state.auth.errorMessage,
});

const connector = connect(mapStateToProps, authActions);

export default connector(Settings);
