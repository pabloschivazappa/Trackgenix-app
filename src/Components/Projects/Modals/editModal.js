import styles from './modal.module.css';
import { FaTimes } from 'react-icons/fa';

export const EditModal = ({ children, state, changeState }) => {
  return (
    <>
      {state && (
        <div className={styles.modalContainer}>
          <overlay>
            <div className={styles.modalDiv}>
              <div className={styles.modalHead}>
                <h3>Delete</h3>
                <button onClick={() => changeState(false)}>
                  <FaTimes />
                </button>
                {children}
              </div>
              <div>
                <button></button>
              </div>
            </div>
          </overlay>
        </div>
      )}
    </>
  );
};
