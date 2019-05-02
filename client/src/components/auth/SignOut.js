import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';

class SignOut extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
      <div>
        <h3>Sorry to see you go</h3>
      </div>
    );
  }
}

export default connect(
  null,
  authActions
)(SignOut);
