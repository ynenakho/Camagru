import { FC, useState, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Comments from './Comments';
import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import Button from '../common/Button';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import { PictureType } from 'actions/types';

type Props = ConnectedProps<typeof connector> & {
  picture: PictureType;
};

const PictureDiv: FC<Props> = ({
  picture,
  deletePictureLanding,
  likePicture,
  auth,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [width, setWidth] = useState(100);

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleDeletePicture = () => {
    // Add prompt and ask are you sure?
    deletePictureLanding(picture._id);
  };

  const handleLike = () => {
    likePicture(picture._id);
  };

  const renderComments = () => {
    if (showComments) {
      return <Comments picture={picture} />;
    }
  };

  const renderButtons = () => {
    return (
      <div>
        <div className="picture-section">
          <LikeButton likePicture={handleLike} auth={auth} picture={picture} />
          <Button func={toggleShowComments} name="Comments" />
        </div>
        {renderComments()}
      </div>
    );
  };

  console.log(picture.picturePath);

  const onImgLoad = (e: SyntheticEvent) => {
    const { offsetHeight, offsetWidth } = e.target as HTMLImageElement;
    if (offsetHeight > offsetWidth) {
      setWidth(56.25);
    }
  };

  return (
    <div className="picture-wrapper">
      <div className="picture-section">
        <b>{picture.userName}</b>
        {auth.authenticated && auth.user && picture._userId === auth.user.id ? (
          <DeleteButton func={handleDeletePicture} />
        ) : (
          <div />
        )}
      </div>
      <div className="image-wrapper">
        <img
          width={`${width}%`}
          src={picture.picturePath}
          alt=""
          key={picture._id}
          onLoad={onImgLoad}
          className="image"
        />
      </div>
      {renderButtons()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(PictureDiv);
