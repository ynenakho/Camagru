import { AuthReducerType, PictureType, LikeType } from 'actions/types';
import { FC, useState } from 'react';
import Modal from 'components/common/Modal';
import { useHistory } from 'react-router-dom';

const findUserLike = (auth: AuthReducerType, likes: LikeType[]) =>
  auth.user && likes.filter((like) => like._userId === auth.user.id).length;

type Props = {
  likePicture: () => void;
  auth: AuthReducerType;
  picture: PictureType;
  // pictureId: string;
};

const LikeButton: FC<Props> = ({ likePicture, auth, picture }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLike = () => {
    if (auth.authenticated) {
      likePicture();
    } else {
      handleToggleModal();
    }
  };

  const handleLogin = () => {
    history.push('/signin');
  };
  return (
    <>
      <div className="like-btn-wrapper">
        <div onClick={handleLike} className="btn like">
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
      <Modal
        title="Please Login"
        onClose={handleLogin}
        show={showModal}
        handleClose={handleToggleModal}
        submitButtonText="Login"
      >
        <p>
          In order to like or comment a picture you will need to be logged in
        </p>
      </Modal>
    </>
  );
};

export default LikeButton;
