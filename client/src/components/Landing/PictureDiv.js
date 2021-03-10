import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';
import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import Button from '../common/Button';
import * as mainActions from '../../actions/mainActions';

export class PictureDiv extends Component {
  state = { showComments: false };

  toggleShowComments = () => {
    const { showComments } = this.state;
    this.setState({
      showComments: !showComments,
    });
  };

  renderComments = () => {
    const { showComments } = this.state;
    const { picture } = this.props;
    if (showComments) {
      return <Comments picture={picture} />;
    }
  };

  renderButtons() {
    const { picture, auth, likePicture, deletePictureLanding } = this.props;
    return (
      <div>
        <div className="buttonsDiv">
          <LikeButton
            likePicture={likePicture}
            auth={auth}
            picture={picture}
            pictureId={picture._id}
          />
          <Button func={this.toggleShowComments} name="Comments" />
          {auth.authenticated &&
          auth.user &&
          picture._userId === auth.user.id ? (
            <DeleteButton func={deletePictureLanding} item={picture._id} />
          ) : null}
        </div>
        {this.renderComments()}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mainActions)(PictureDiv);
