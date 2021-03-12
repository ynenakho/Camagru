import { FC } from 'react';

type Props = {
  func: () => void;
  name: string;
};

const Button: FC<Props> = ({ func, name }) => {
  return (
    <button
      className="btn blue lighten-1 white-text waves-effect waves-light"
      onClick={func}
    >
      {name}
    </button>
  );
};

export default Button;
