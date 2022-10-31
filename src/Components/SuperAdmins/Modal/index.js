import React from 'react';
import styles from './modal.module.css';

console.log(styles);

const Modal = ({ content, contentMessage, title }) => {
  return (
    <div id="id-screen" className={styles.screen}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.header__title}>{title}</h3>
          <button className={styles.header__button}>X</button>
        </header>
        <div className={styles.content}>
          {content ?? null}
          {contentMessage ? <p className={styles.content__message}>{contentMessage}</p> : null}
          <span className={styles.content__options}>
            <button type="submit" className={`${styles.options__button} ${styles.options__agree}`}>
              Agree
            </button>
            <button className={`${styles.options__button} ${styles.options__cancel}`}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
