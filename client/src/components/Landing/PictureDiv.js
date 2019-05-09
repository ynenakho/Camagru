import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import Comments from './Comments';
import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import Button from '../common/Button';

export class PictureDiv extends Component {
  state = {
    showComments: false
  };

  toggleShowComments = () => {
    const { showComments } = this.state;
    this.setState({
      showComments: !showComments
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <LikeButton
            likePicture={likePicture}
            auth={auth}
            picture={picture}
            pictureId={picture._id}
          />
          <Button func={this.toggleShowComments} name="Comments" />
          {auth.authenticated && auth.user.id === picture._userId ? (
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
        <img
          width="100%"
          src={picture.picturePath}
          alt=""
          key={picture._id}
          // onClick={() => this.props.getPictureDetailsView(picture._id, () => this.props.push('/'))}
        />
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mainActions
)(PictureDiv);
