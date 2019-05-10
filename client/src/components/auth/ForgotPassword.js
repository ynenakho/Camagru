import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import renderField from '../common/renderField';
import AuthButton from '../common/AuthButton';
import * as authActions from '../../actions/authActions';

class ForgotPassword extends Component {
  componentDidMount() {
    this.modalTrigger = M.Modal.init(this.modal);
  }

  onSubmit = formValues => {
    return this.props.forgotPassword(formValues, () => {
      this.modalTrigger.open();
    });
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <>
        <div className="section section-login">
          <div className="container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel blue darken-2 white-text center">
                  <h3>Forgot Password?</h3>
                  <h6>Get your new password sent on email</h6>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
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
        <div id="modal1" className="modal" ref={modal => (this.modal = modal)}>
          <div className="modal-content">
            <h4>Confirmation</h4>
            <p>New password has been sent to {this.props.email}</p>
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
  }
}

const validate = ({ email }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const selector = formValueSelector('forgotPassword');

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  email: selector(state, 'email')
});

export default compose(
  connect(
    mapStateToProps,
    authActions
  ),
  reduxForm({ form: 'forgotPassword', validate })
)(ForgotPassword);
