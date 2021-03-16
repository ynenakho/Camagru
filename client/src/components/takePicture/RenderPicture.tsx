import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import * as mainActions from '../../actions/mainActions';
import { AuthReducerType, PictureType } from 'actions/types';

type Props = ConnectedProps<typeof connector> & {
  picture: PictureType;
  auth: AuthReducerType;
};

const RenderPicture: FC<Props> = ({
  picture,
  auth,
  likePicture,
  deletePicture,
}) => {
  const handleDeletePicture = () => {
    // Add prompt and ask are you sure?
    deletePicture(picture._id);
  };

  const handleLike = () => {
    likePicture(picture._id);
  };

  const renderButtons = () => {
    return (
      <div className="underPicButtons">
        <LikeButton likePicture={handleLike} auth={auth} picture={picture} />
        <DeleteButton func={handleDeletePicture} />
      </div>
    );
  };

  return (
    <div>
      <img width="100%" src={picture.picturePath} alt="" />
      {renderButtons()}
    </div>
  );
};

const connector = connect(null, mainActions);

export default connector(RenderPicture);
