import React from 'react';

const Button = ({ label, onClick, color, classNames, ...rest }) => {

  return (
    <button
      onClick={onClick}
      className={` ${classNames}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
