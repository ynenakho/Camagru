import { FC } from 'react';

type Props = {
  func: () => void;
};

const DeleteButton: FC<Props> = ({ func }) => {
  return (
    <div onClick={func} className="btn">
      <i className="fas fa-times" />
    </div>
  );
};

export default DeleteButton;
