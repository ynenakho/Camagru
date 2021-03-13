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
    <div className="like-btn-wrapper">
      <div onClick={likePicture} className="btn like">
        <i
          className={
            findUserLike(auth, picture.likes)
              ? 'fas fa-heart fa-lg red'
              : 'far fa-heart fa-lg'
          }
        ></i>
      </div>
      {picture.likes.length}
    </div>
  );
};

export default LikeButton;
