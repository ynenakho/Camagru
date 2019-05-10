import React from 'react';
import styles from './AuthButton.module.css';

const AuthButton = ({ submitting, name }) => {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={`btn btn-extended grey lighten-4 black-text ${
        styles.authbutton
      }`}
    >
      {name}
    </button>
  );
};

export default AuthButton;
