import React from 'react';
import modalstyles from './modal.module.css';

const Modal = ({ content, contentMessage, title, setModalDisplay }) => {
  return (
    <>
      <div
        id="id-screen"
        onClick={() => setModalDisplay(false)}
        className={modalstyles.screen}
      ></div>
      <div id="id-modal" className={modalstyles.modal}>
        <header className={modalstyles.header}>
          <h3 className={modalstyles.header__title}>{title}</h3>
          <button className={modalstyles.header__button} onClick={() => setModalDisplay(false)}>
            <i className="fa-solid fa-square-xmark fa-2xl"></i>
          </button>
        </header>
        <div className={modalstyles.content}>
          {content ?? null}
          {contentMessage ? <p className={modalstyles.content__message}>{contentMessage}</p> : null}
          <button
            className={`${modalstyles.options__button} ${modalstyles.options__close}`}
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
