import styles from './modal.module.css';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({ children, state, changeState }) => {
  return (
    <>
      {state && (
        <div className={styles.modalContainer}>
          <overlay>
            <div className={styles.modalDiv}>
              <div className={styles.modalHead}>
                <h3></h3>
                <button onClick={() => changeState(false)}>
                  <FaTimes />
                </button>
                {children}
              </div>
            </div>
          </overlay>
        </div>
      )}
    </>
  );
};
