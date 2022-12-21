import React from 'react';
import styles from 'Components/Shared/Modal/modal.module.css';
import Button from 'Components/Shared/Buttons/FunctionalButton';

const Modal = ({
  title,
  children,
  setModalDisplay,
  isToConfirm,
  onClickFunction,
  isForm = false
}) => {
  return (
    <>
      <div id="id-screen" onClick={() => setModalDisplay(false)} className={styles.screen}></div>
      <div className={`${styles.modal} ${!isForm && styles.background}`}>
        <header className={`${styles.header}`}>
          <h3 className={styles.header__title}>{title}</h3>
        </header>
        <div className={styles.content}>
          {isForm ? children : <p className={styles.content__message}>{children}</p>}
          <span>
            <Button
              buttonType="form__button"
              buttonColor="red"
              action={() => setModalDisplay(false)}
              title="Close"
            />
            {isToConfirm ? (
              <Button
                buttonType="form__button"
                buttonColor="green"
                action={() => onClickFunction()}
                title="Confirm"
              />
            ) : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default Modal;
