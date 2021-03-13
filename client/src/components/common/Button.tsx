import { FC } from 'react';

type Props = {
  func: () => void;
  name: string;
};

const Button: FC<Props> = ({ func, name }) => {
  return (
    <button className="btn auth-btn" onClick={func}>
      {name}
    </button>
  );
};

export default Button;
