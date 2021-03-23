import { ChangeEvent, useState, useEffect, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import InputField from 'components/common/InputField';
import AuthButton from 'components/common/AuthButton';
import * as authActions from 'actions/authActions';
import { ReduxState } from 'reducers';
import Modal from 'components/common/Modal';
import { useHistory } from 'react-router-dom';

type Props = ConnectedProps<typeof connector>;

type FormType = {
  email: string;
};

const INITIAL_FORM = {
  email: '',
};

const ForgotPassword: FC<Props> = ({
  forgotPassword,
  errorMessage,
  clearErrors,
}) => {
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
    await forgotPassword(form, () => {
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
        <h1>Forgot Password?</h1>
        <h4>Get your new password sent on email</h4>
        <div>
          <InputField
            label="Email"
            icon="email"
            name="email"
            type="text"
            value={form.email}
            onChange={onChange}
            error={errors.email}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="signup-buttons-wrapper">
            <AuthButton
              submitting={submitting}
              name="submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Modal title="Confirmation" onClose={onClose} show={showModal}>
        <p>New password has been sent to {form.email}</p>
      </Modal>
    </>
  );
};

const validate = ({ email }: FormType) => {
  const errors: FormType = { email: '' };

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const mapStateToProps = (state: ReduxState) => ({
  errorMessage: state.auth.errorMessage,
});

const connector = connect(mapStateToProps, authActions);

export default connector(ForgotPassword);
