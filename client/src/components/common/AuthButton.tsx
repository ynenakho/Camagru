import { FC } from 'react';

type Props = {
  submitting: boolean;
  name: string;
};

const AuthButton: FC<Props> = ({ submitting, name }) => {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="btn btn-extended grey lighten-4 black-text auth-button"
    >
      {name}
    </button>
  );
};

export default AuthButton;
