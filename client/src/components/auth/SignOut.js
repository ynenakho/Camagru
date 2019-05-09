import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';

class SignOut extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card-panel blue darken-2 white-text center">
            <h3 className="center">SORRY TO SEE YOU GO</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  authActions
)(SignOut);
