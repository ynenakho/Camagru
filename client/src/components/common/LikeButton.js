import React from 'react';
import classnames from 'classnames';

const findUserLike = (auth, likes) => {
  return auth.user &&
    likes.filter(like => like._userId === auth.user.id).length > 0
    ? true
    : false;
};

const LikeButton = ({ likePicture, auth, picture, pictureId }) => {
  return (
    <button
      onClick={() => likePicture(pictureId)}
      type="button"
      className="btn blue lighten-3 waves-effect waves-light"
      style={{ width: '80px' }}
    >
      <i
        className={classnames('fas fa-thumbs-up left', {
          'blue-text': findUserLike(auth, picture.likes)
        })}
      />
      {picture.likes.length}
    </button>
  );
};

export default LikeButton;
