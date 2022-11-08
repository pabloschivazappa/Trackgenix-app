import React from 'react';
import styles from './buttons.module.css';

const FunctionalButton = ({
  type = 'button',
  title = null,
  icon = null,
  action = null,
  buttonType
}) => {
  return (
    <button
      className={`${styles[buttonType]} ${styles['add__button']}`}
      onClick={action}
      type={type}
    >
      <p>{title}</p>
      {icon}
    </button>
  );
};

export default FunctionalButton;
