import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import renderField from '../common/renderField';
import AuthButton from '../common/AuthButton';
import * as authActions from '../../actions/authActions';

class SignIn extends Component {
  onSubmit = (formValues) => {
    const { signin, history } = this.props;
    return signin(formValues, () => {
      history.push('/');
    });
  };

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
                    labelColor="white-text"
                    label="Username"
                    icon="account_box"
                    name="username"
                    type="text"
                    component={renderField}
                  />
                  <Field
                    labelColor="white-text"
                    label="Password"
                    icon="lock"
                    name="password"
                    type="password"
                    component={renderField}
                  />
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <AuthButton submitting={submitting} name="Login" />
                  <Link
                    to="/forgotpassword"
                    disabled={submitting}
                    className="btn btn-extended grey lighten-4 black-text auth-button"
                  >
                    FORGOT PASSWORD
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = ({ username, password }) => {
  const errors = {};

  if (!password) {
    errors.password = 'Password field is required';
  }
  if (!username) {
    errors.username = 'Username field is required';
  }
  return errors;
};

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
});

const afterSubmit = (result, dispatch) => dispatch(reset('signIn'));

export default compose(
  connect(mapStateToProps, authActions),
  reduxForm({ form: 'signIn', validate, onSubmitSuccess: afterSubmit })
)(SignIn);
