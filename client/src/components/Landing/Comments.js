import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import * as mainActions from '../../actions/mainActions';

export class Comments extends Component {
  renderComments = () => {
    const {
      deleteComment,
      picture,
      picture: { comments },
      auth
    } = this.props;
    return comments.map(comment => (
      <li className="collection-item blue lighten-1" key={comment._id}>
        <div>
          <span className="title">
            <h5>{comment.userName}</h5>
          </span>
          {comment.text}
          {auth.user && auth.user.id === comment._userId ? (
            <i
              onClick={() => deleteComment(picture._id, comment._id)}
              className="fas fa-times secondary-content white-text"
              style={{ cursor: 'pointer' }}
            />
          ) : null}
        </div>
      </li>
    ));
  };

  render() {
    const { picture, auth } = this.props;
    return (
      <div className="card-panel blue lighten-3">
        <ul className="collection with-header ">
          <li className="collection-header blue lighten-1">
            <h4>Comments</h4>
          </li>
          {this.renderComments()}
        </ul>
        {auth.authenticated ? <CommentForm picture={picture} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mainActions
)(Comments);
