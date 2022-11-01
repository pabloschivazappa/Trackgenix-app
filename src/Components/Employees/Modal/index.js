import React from 'react';
import styles from './modal.module.css';

console.log(styles);

const Modal = ({ content, contentMessage, title, setModalDisplay }) => {
  return (
    <div id="id-screen" className={styles.screen}>
      <div className={styles.modal} onBlur={() => console.log(1)}>
        <header className={styles.header}>
          <h3 className={styles.header__title}>{title}</h3>
          <button className={styles.header__button} onClick={() => setModalDisplay(false)}>
            <i className="fa-solid fa-square-xmark fa-2xl"></i>
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
    </div>
  );
};

export default Modal;
