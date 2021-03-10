import React from 'react';

const AuthButton = ({ submitting, name }) => {
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
