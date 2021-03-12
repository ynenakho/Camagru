import { FC } from 'react';

type Props = {
  func: () => void;
};

const DeleteButton: FC<Props> = ({ func }) => {
  return (
    <button
      onClick={func}
      type="button"
      className="btn blue waves-effect waves-light"
    >
      <i className="fas fa-times" />
    </button>
  );
};

export default DeleteButton;
