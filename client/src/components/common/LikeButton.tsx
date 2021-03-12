import { AuthReducerType, PictureType, LikeType } from 'actions/types';
import { FC } from 'react';

const findUserLike = (auth: AuthReducerType, likes: LikeType[]) =>
  auth.user && likes.filter((like) => like._userId === auth.user.id).length;

type Props = {
  likePicture: () => void;
  auth: AuthReducerType;
  picture: PictureType;
  // pictureId: string;
};

const LikeButton: FC<Props> = ({ likePicture, auth, picture }) => {
  return (
    <button
      onClick={likePicture}
      type="button"
      className="btn blue lighten-3 waves-effect waves-light"
      style={{ width: '80px' }}
    >
      <i
        className={`fas fa-thumbs-up left ${
          findUserLike(auth, picture.likes) ? 'blue-text' : ''
        }`}
      />
      {picture.likes.length}
    </button>
  );
};

export default LikeButton;
