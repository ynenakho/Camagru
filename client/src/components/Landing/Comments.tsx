import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CommentForm from 'components/Landing/CommentForm';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import { PictureType } from 'actions/types';
import DeleteButton from 'components/common/DeleteButton';

type Props = ConnectedProps<typeof connector> & {
  picture: PictureType;
};

const Comments: FC<Props> = ({ deleteComment, picture, auth }) => {
  const renderComments = () => {
    return picture.comments.map((comment) => (
      <div className="comment" key={comment._id}>
        <p>
          <b>{comment.userName}</b>{' '}
          <span className="comment-text">{comment.text}</span>
        </p>

        {auth.user && auth.user.id === comment._userId ? (
          <DeleteButton func={() => deleteComment(picture._id, comment._id)} />
        ) : (
          <div />
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="comments-section">{renderComments()}</div>
      {auth.authenticated ? <CommentForm picture={picture} /> : null}
    </>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(Comments);
