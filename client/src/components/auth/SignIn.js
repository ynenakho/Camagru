import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
// import M from 'materialize-css';
// import { Link } from 'react-router-dom';

class SignIn extends Component {
  onSubmit = formValues => {
    console.log('signin form values', formValues);

    return this.props.signin(formValues, () => {
      this.props.history.push('/');
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
      <div className="section section-login">
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel blue darken-2 white-text center">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <Field
                    label="Username"
                    icon="account_box"
                    name="username"
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
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = ({ username, email, password }) => {
  const errors = {};

  if (!password) {
    errors.password = 'Password field is required';
  }
  if (!username) {
    errors.username = 'Username field is required';
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('signIn'));

export default compose(
  connect(
    mapStateToProps,
    authActions
  ),
  reduxForm({ form: 'signIn', validate, onSubmitSuccess: afterSubmit })
)(SignIn);
