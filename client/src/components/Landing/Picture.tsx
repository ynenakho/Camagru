import { FC, useState, SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Comments from './Comments';
import DeleteButton from '../common/DeleteButton';
import LikeButton from '../common/LikeButton';
import Button from '../common/Button';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import { PictureType } from 'actions/types';
import Modal from 'components/common/Modal';

type Props = ConnectedProps<typeof connector> & {
  picture: PictureType;
  own?: boolean;
};

const PictureDiv: FC<Props> = ({
  picture,
  deletePicture,
  likePicture,
  auth,
  own,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [width, setWidth] = useState(100);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleDeletePicture = () => {
    deletePicture(picture._id);
    setShowDeleteModal(false);
  };

  const handleLike = () => {
    likePicture(picture._id);
  };

  const renderComments = () => {
    if (showComments) {
      return <Comments picture={picture} />;
    }
    return null;
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

  const onImgLoad = (e: SyntheticEvent) => {
    const { offsetHeight, offsetWidth } = e.target as HTMLImageElement;
    if (offsetHeight > offsetWidth) {
      setWidth(56.25);
    }
  };

  return (
    <>
      <div className="picture-wrapper">
        <div className="picture-section">
          <b>{picture.userName}</b>
          {auth.authenticated &&
          auth.user &&
          picture._userId === auth.user.id ? (
            <DeleteButton func={handleToggleModal} />
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

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(PictureDiv);
