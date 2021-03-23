import { ChangeEvent, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as authActions from '../../actions/authActions';
import InputField from '../common/InputField';
import AuthButton from '../common/AuthButton';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';
import { useHistory } from 'react-router-dom';

type Props = ConnectedProps<typeof connector>;

type FormType = {
  username: string;
  email: string;
  password: string;
};

const INITIAL_FORM = {
  username: '',
  email: '',
  password: '',
};

const SignUp: React.FC<Props> = ({ errorMessage, signup, clearErrors }) => {
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_FORM);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => clearErrors, [clearErrors]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClose = () => {
    toggleModal();
    history.push('/signin');
  };

  const onSubmit = async () => {
    setSubmitting(true);
    await signup(form, () => {
      toggleModal();
    });
    setSubmitting(false);
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
        <h1>Sign Up</h1>
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
            label="Password"
            icon="lock"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            error={errors.password}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="signup-buttons-wrapper">
            <AuthButton
              submitting={submitting}
              name="sign up"
              onClick={handleSubmit}
            />
          </div>
        </div>
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
  } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
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

const connector = connect(mapStateToProps, authActions);

export default connector(SignUp);
