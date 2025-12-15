import React from 'react';
import './Button.css';


// Komponen Button dengan props
const Button = ({
  children,
  variant = 'primary', // default value
  size = 'medium',
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;