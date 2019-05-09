import React from 'react';

const DeleteButton = ({ func, item }) => {
  return (
    <button
      onClick={() => func(item)}
      type="button"
      className="btn blue waves-effect waves-light"
    >
      <i className="fas fa-times" />
    </button>
  );
};

export default DeleteButton;
