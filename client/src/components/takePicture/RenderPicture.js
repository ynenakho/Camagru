import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import * as mainActions from '../../actions/mainActions';

export class RenderPicture extends Component {
  renderButtons() {
    const { picture, auth, likePicture, deletePicture } = this.props;
    return (
      <div className="underPicButtons">
        <LikeButton
          likePicture={likePicture}
          auth={auth}
          picture={picture}
          pictureId={picture._id}
        />
        <DeleteButton func={deletePicture} item={picture._id} />
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

export default connect(null, mainActions)(RenderPicture);
