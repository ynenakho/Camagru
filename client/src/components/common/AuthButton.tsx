import { FC } from 'react';

type Props = {
  submitting: boolean;
  name: string;
};

const AuthButton: FC<Props> = ({ submitting, name }) => {
  return (
    <button type="submit" disabled={submitting} className="btn auth-btn">
      {name}
    </button>
  );
};

export default AuthButton;
