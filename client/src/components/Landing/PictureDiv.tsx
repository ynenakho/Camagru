import { FC, useState } from 'react';
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
        <div className="buttonsDiv">
          <LikeButton likePicture={handleLike} auth={auth} picture={picture} />
          <Button func={toggleShowComments} name="Comments" />
          {auth.authenticated &&
          auth.user &&
          picture._userId === auth.user.id ? (
            <DeleteButton func={handleDeletePicture} />
          ) : null}
        </div>
        {renderComments()}
      </div>
    );
  };

  return (
    <div>
      <img width="100%" src={picture.picturePath} alt="" key={picture._id} />
      {renderButtons()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(PictureDiv);
