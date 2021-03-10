import React from 'react';

const findUserLike = (auth, likes) => {
  return auth.user &&
    likes.filter((like) => like._userId === auth.user.id).length > 0
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
        className={`fas fa-thumbs-up left ${
          findUserLike(auth, picture.likes) ? 'blue-text' : ''
        }`}
      />
      {picture.likes.length}
    </button>
  );
};

export default LikeButton;
