import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import M from 'materialize-css';

import renderField from '../common/renderField';
import * as authActions from '../../actions/authActions';

class Settings extends Component {
  componentDidMount() {
    this.modalTrigger = M.Modal.init(this.modal);
  }

  onSubmit = (formValues) => {
    const { updateProfile } = this.props;
    return updateProfile(formValues, () => {
      this.modalTrigger.open();
    });
  };

  checkBox = ({ input }) => (
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
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <>
        <div className="settings">
          <div className="row">
            <div className="col l6 offset-l3 m8 offset-m2 s10 offset-s1 center">
              <h1 className="blue-text">Settings</h1>
              <form onSubmit={handleSubmit(this.onSubmit)}>
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
                <Field
                  name="getNotified"
                  id="getNotified"
                  component={this.checkBox}
                />
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
        <div
          id="modal1"
          className="modal"
          ref={(modal) => (this.modal = modal)}
        >
          <div className="modal-content">
            <h4>Confirmation</h4>
            <p>Your settings are updated</p>
          </div>
          <div className="modal-footer">
            <button
              to=""
              className="modal-close waves-effect waves-green btn-flat"
            >
              OK
            </button>
          </div>
        </div>
      </>
    );
  }
}

const validate = ({ username, email, newPassword, oldPassword }) => {
  const errors = {};

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

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  user: state.auth.user,
  initialValues: state.auth.user,
  errorMessage: state.auth.errorMessage,
});

export default compose(
  connect(mapStateToProps, authActions),
  reduxForm({ form: 'settings', validate })
)(Settings);
