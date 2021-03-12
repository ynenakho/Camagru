import { useState, useEffect, useRef, FC, ComponentType } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import M from 'materialize-css';

import renderField from '../common/renderField';
import * as authActions from '../../actions/authActions';
import { ReduxState } from 'reducers';

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
  const [modalTrigger, setModalTrigger] = useState<any>(null);
  useEffect(() => {
    setModalTrigger(M.Modal.init(modalRef.current));
  }, []);

  const modalRef = useRef(null);

  const onSubmit: any = (formValues: FormType) => {
    return updateProfile(formValues, () => {
      modalTrigger?.open();
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
      <div className="settings">
        <div className="row">
          <div className="col l6 offset-l3 m8 offset-m2 s10 offset-s1 center">
            <h1 className="blue-text">Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field
                labelColor="blue-text"
                icon="account_box"
                name="username"
                type="text"
                component={renderField}
              />
              <Field
                labelColor="blue-text"
                icon="email"
                name="email"
                type="text"
                component={renderField}
              />
              <Field
                labelColor="blue-text"
                label="New Password"
                icon="lock"
                name="newPassword"
                type="password"
                component={renderField}
              />
              <Field
                labelColor="blue-text"
                label="Old Password"
                icon="lock"
                name="oldPassword"
                type="password"
                component={renderField}
              />
              <Field name="getNotified" id="getNotified" component={checkBox} />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-extended blue lighten-2 black-text settings-button"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>Confirmation</h4>
          <p>Your settings are updated</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">
            OK
          </button>
        </div>
      </div>
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
