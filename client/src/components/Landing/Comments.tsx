import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CommentForm from 'components/Landing/CommentForm';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import { PictureType } from 'actions/types';

type Props = ConnectedProps<typeof connector> & {
  picture: PictureType;
};

const Comments: FC<Props> = ({
  deleteComment,
  picture,
  // picture: { comments },
  auth,
}) => {
  console.log(CommentForm);

  const renderComments = () => {
    return picture.comments.map((comment) => (
      <li className="collection-item blue lighten-1" key={comment._id}>
        <div>
          <span className="title">
            <h5>{comment.userName}</h5>
          </span>
          {comment.text}
          {auth.user && auth.user.id === comment._userId ? (
            <i
              onClick={() => deleteComment(picture._id, comment._id)}
              className="fas fa-times secondary-content white-text"
              style={{ cursor: 'pointer' }}
            />
          ) : null}
        </div>
      </li>
    ));
  };

  return (
    <div className="card-panel blue lighten-3">
      <ul className="collection with-header ">
        <li className="collection-header blue lighten-1">
          <h4>Comments</h4>
        </li>
        {renderComments()}
      </ul>
      {/* {auth.authenticated ? <CommentForm picture={picture} /> : null} */}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(Comments);
