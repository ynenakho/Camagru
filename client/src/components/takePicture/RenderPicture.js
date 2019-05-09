import React, { Component } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
// import * as editPictureActions from '../../actions/editPictureActions';
import * as mainActions from '../../actions/mainActions';
import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';

export class RenderPicture extends Component {
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
        <LikeButton
          likePicture={this.props.likePicture}
          auth={auth}
          picture={picture}
          pictureId={picture._id}
        />
        <DeleteButton func={this.props.deletePicture} item={picture._id} />
      </div>
    );
  }

  render() {
    const { picture } = this.props;
    return (
      <div>
        <img width="100%" src={picture.picturePath} alt="" key={picture._id} />
        {this.renderButtons()}
      </div>
    );
  }
}

export default connect(
  null,
  mainActions
)(RenderPicture);
