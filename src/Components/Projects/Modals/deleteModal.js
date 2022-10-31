import styles from './modal.module.css';
import { FaTimes } from 'react-icons/fa';

export const DeleteModal = ({ children, state, changeState, listItem, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
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
                <p>Are you shure you want to delete this project?</p>
                <button onClick={() => handleDelete(listItem._id)}>Delete</button>
              </div>
            </div>
          </overlay>
        </div>
      )}
    </>
  );
};
