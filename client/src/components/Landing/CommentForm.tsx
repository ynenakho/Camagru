import { PictureType } from 'actions/types';
import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as mainActions from '../../actions/mainActions';

type Props = ConnectedProps<typeof connector> & { picture: PictureType };

const CommentForm: FC<Props> = ({ picture, addComment }) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addComment(picture._id, { text });
    setText('');
  };

  return (
    <form className="add-comment-section" onSubmit={onSubmit}>
      <input
        onChange={handleChange}
        value={text}
        className="comment-input"
        placeholder="Add a comment..."
        autoFocus
      />
      <button type="submit" className="btn blue" disabled={!text}>
        Send
      </button>
    </form>
  );
};

const connector = connect(null, mainActions);

export default connector(CommentForm);
