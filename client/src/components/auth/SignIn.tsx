import { ChangeEvent, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import InputField from '../common/InputField';
import AuthButton from '../common/AuthButton';
import * as authActions from '../../actions/authActions';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

type FormType = {
  username: string;
  password: string;
};

const INITIAL_FORM = {
  username: '',
  password: '',
};

const SignIn: React.FC<Props> = ({ signin, errorMessage, clearErrors }) => {
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_FORM);

  useEffect(() => clearErrors, [clearErrors]);

  const onSubmit = async () => {
    setSubmitting(true);
    await signin(form, () => {
      history.push('/');
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
    <div className="section">
      <h1>Login</h1>
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
          label="Password"
          icon="lock"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="signin-buttons-wrapper">
          <AuthButton
            submitting={submitting}
            name="Login"
            onClick={handleSubmit}
          />
          <Link to="/forgotpassword" className="btn auth-btn-grey">
            Forgot Password
          </Link>
        </div>
      </div>
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

const connector = connect(mapStateToProps, authActions);

export default connector(SignIn);
