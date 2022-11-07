import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, children, setModalDisplay, isToConfirm = false, onClickFunction }) => {
  return (
    <>
      <div id="id-screen" onClick={() => setModalDisplay(false)} className={styles.screen}></div>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.header__title}>{title}</h3>
          <button
            className={styles.header__button}
            onClick={() => {
              setModalDisplay(false);
            }}
          >
            <i className="fa-solid fa-square-xmark fa-2xl"></i>
          </button>
        </header>
        <div className={styles.content}>
          <p className={styles.content__message}>{children}</p>
          <span>
            <button
              className={`${styles.options__button} ${styles.options__close}`}
              onClick={() => setModalDisplay(false)}
            >
              Close
            </button>
            {isToConfirm ? (
              <button
                className={`${styles.options__button} ${styles.options__close}`}
                onClick={() => onClickFunction()}
              >
                Confirm
              </button>
            ) : null}
          </span>
        </div>
      </div>
    </>
  );
};

export default Modal;
