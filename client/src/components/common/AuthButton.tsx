import { FC } from 'react';

type Props = {
  submitting: boolean;
  name: string;
  onClick?: () => void;
};

const AuthButton: FC<Props> = ({ submitting, name, onClick }) => {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="btn auth-btn"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default AuthButton;
