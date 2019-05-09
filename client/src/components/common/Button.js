import React from 'react';

const Button = ({ func, name }) => {
  return (
    <button
      className="btn blue lighten-1 white-text waves-effect waves-light"
      onClick={() => func()}
    >
      {name}
    </button>
  );
};

export default Button;
