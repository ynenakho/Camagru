import { PictureType } from 'actions/types';
import { ChangeEvent, FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as mainActions from '../../actions/mainActions';

type Props = ConnectedProps<typeof connector> & { picture: PictureType };

const CommentForm: FC<Props> = ({ picture, addComment }) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    addComment(picture._id, { text });
    setText('');
  };

  return (
    <div>
      <textarea
        onChange={handleChange}
        name="text"
        value={text}
        className="white-text"
        style={{ padding: '10px' }}
      />
      <button onClick={onSubmit} className="btn blue">
        Send
      </button>
    </div>
  );
};

const connector = connect(null, mainActions);

export default connector(CommentForm);
