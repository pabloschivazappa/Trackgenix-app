import React from 'react';
import styles from './modal.module.css';

const Modal = ({ content, contentMessage, title, setModalDisplay }) => {
  return (
    <>
      <div id="id-screen" onClick={() => setModalDisplay(false)} className={styles.screen}></div>
      <div id="id-modal" className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.header__title}>{title}</h3>
          <button className={styles.header__button} onClick={() => setModalDisplay(false)}>
            X
          </button>
        </header>
        <div className={styles.content}>
          {content ?? null}
          {contentMessage ? <p className={styles.content__message}>{contentMessage}</p> : null}
          <button
            className={`${styles.options__button} ${styles.options__close}`}
            onClick={() => setModalDisplay(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
