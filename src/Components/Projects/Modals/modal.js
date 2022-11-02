import modalStyles from './modal.module.css';

export const Modal = ({ props, state, changeState, listItem, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <>
      {state && (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.modalDiv}>
            <div className={modalStyles.modalHead}>
              <h3>{props.title}</h3>
              <button onClick={() => changeState(false)}>
                <i className="fa-solid fa-x"></i>
              </button>
              {props}
            </div>
            <div>
              <p>{props.paragraph}</p>
              <button
                onClick={() => {
                  handleDelete(listItem._id);
                  changeState(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
