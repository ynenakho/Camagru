import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  componentDidMount() {
    this.modalTrigger = M.Modal.init(this.modal);
  }
  onSubmit = formValues => {
    console.log('signup form values', formValues);

    return this.props.signup(formValues, () => {
      this.modalTrigger.open();
    });
  };

  renderField = ({
    icon,
    input,
    label,
    type,
    name,
    meta: { touched, error, warning }
  }) => (
    <div className="input-field invalid">
      <i className="material-icons prefix">{icon}</i>
      <input
        {...input}
        type={type}
        autoComplete="off"
        className={touched && error ? 'invalid' : touched ? 'valid' : ''}
      />

      <label className="white-text" htmlFor={name}>
        {label}
      </label>
      {touched &&
        (error && <span className="helper-text" data-error={error} />)}
    </div>
  );

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <>
        <div className="section section-login">
          <div className="container">
            <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel blue darken-2 white-text center">
                  <h1>Sign Up</h1>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                      label="Username"
                      icon="account_box"
                      name="username"
                      type="text"
                      component={this.renderField}
                    />
                    <Field
                      label="Email"
                      icon="email"
                      name="email"
                      type="text"
                      component={this.renderField}
                    />
                    <Field
                      label="Password"
                      icon="lock"
                      name="password"
                      type="password"
                      component={this.renderField}
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-extended grey lighten-4 black-text"
                      style={{
                        display: 'block',
                        width: '80%',
                        margin: 'auto',
                        marginTop: '20px'
                      }}
                    >
                      SIGN UP
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal" ref={modal => (this.modal = modal)}>
          <div className="modal-content">
            <h4>Almost there!</h4>
            <p>
              Check your email and follow the instructions to validate your
              account
            </p>
          </div>
          <div className="modal-footer">
            <Link
              to="/signin"
              className="modal-close waves-effect waves-green btn-flat"
            >
              OK
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const validate = ({ username, email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
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

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('signUp'));

export default compose(
  connect(
    mapStateToProps,
    authActions
  ),
  reduxForm({ form: 'signUp', validate, onSubmitSuccess: afterSubmit })
)(SignUp);
