import React from 'react';
import styles from 'Components/Shared/Buttons/buttons.module.css';

const FunctionalButton = ({
  type = 'button',
  title = null,
  icon = null,
  action = null,
  buttonType,
  buttonColor
}) => {
  return (
    <button className={`${styles[buttonType]} ${styles[buttonColor]}`} onClick={action} type={type}>
      {title}
      {icon}
    </button>
  );
};

export default FunctionalButton;
