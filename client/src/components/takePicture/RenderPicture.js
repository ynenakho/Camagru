import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

export class RenderPicture extends Component {
  findUserLike() {
    const {
      auth,
      picture: { likes }
    } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  renderButtons() {
    const { picture, auth } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}
      >
        <button
          disabled
          // onClick={async () => {
          //   await this.props.likePicture(picture._id, auth.user.id);
          //   this.forceUpdate();
          // }}
          type="button"
          className="btn blue lighten-3"
        >
          <i
            className={classnames('fas fa-thumbs-up', {
              'blue-text': this.findUserLike()
            })}
          />
          <span style={{ marginLeft: '5px' }}>{picture.likes.length}</span>
        </button>
        <button
          onClick={() => this.props.deletePicture(picture._id)}
          type="button"
          className="btn"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    );
  }

  render() {
    const { picture } = this.props;
    return (
      <div>
        <img
          width="100%"
          src={picture.picturename}
          alt=""
          key={picture._id}
          // onClick={() => this.props.getPictureDetailsView(picture._id, () => this.props.push('/'))}
        />
        {this.renderButtons()}
      </div>
    );
  }
}

export default connect(
  null,
  editPictureActions
)(RenderPicture);
