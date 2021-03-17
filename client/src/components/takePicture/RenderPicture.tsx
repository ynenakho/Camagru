import { FC, useState, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import * as mainActions from '../../actions/mainActions';
import { AuthReducerType, PictureType } from 'actions/types';
import Modal from 'components/common/Modal';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [width, setWidth] = useState(100);

  const handleToggleModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeletePicture = () => {
    deletePicture(picture._id);
    setShowDeleteModal(false);
  };

  const handleLike = () => {
    likePicture(picture._id);
  };

  const renderButtons = () => {
    return (
      <>
        <div className="under-pic-buttons">
          <LikeButton likePicture={handleLike} auth={auth} picture={picture} />
          <div className="delete-button-wrapper">
            <DeleteButton func={handleToggleModal} />
          </div>
        </div>
        <Modal
          title="Delete picture"
          onClose={handleDeletePicture}
          show={showDeleteModal}
          handleClose={handleToggleModal}
          submitButtonText="Delete"
        >
          <p>Are you sure you want to delete this picture?</p>
        </Modal>
      </>
    );
  };

  const onImgLoad = (e: SyntheticEvent) => {
    const { offsetHeight, offsetWidth } = e.target as HTMLImageElement;
    if (offsetHeight > offsetWidth) {
      setWidth(56.25);
    }
  };

  return (
    <div className="user-picture-wrapper">
      <div className="user-picture">
        <div className="user-image">
          <img
            width={`${width}%`}
            src={picture.picturePath}
            alt=""
            onLoad={onImgLoad}
            className="image"
          />
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

const connector = connect(null, mainActions);

export default connector(RenderPicture);
