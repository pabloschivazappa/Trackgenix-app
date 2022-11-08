import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../../Shared/Modal';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [descriptionValue, setDescrpitionValue] = useState('');

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (contentSubTitle, description) => {
    return `${contentSubTitle}:\n
    Description: ${description}`;
  };

  useEffect(async () => {
    if (idRegEx.test(urlID)) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`);
        const data = await response.json();
        setDescrpitionValue(data.data.description);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const editTask = async (urlID) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
      const data = await response.json();
      setModalTitle('Edit Task');
      if (data.error === true) {
        setChildren(data.message);
      } else {
        setChildren(() => editAndCreateMessage(data.message, data.data.description));
      }
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const createTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
      const data = await response.json();
      setModalTitle('Create Task');
      if (data.error === true) {
        setChildren(data.message);
      } else {
        setChildren(() => editAndCreateMessage(data.message, data.data.description));
      }
    } catch (error) {
      setChildren(error);
    }
    setModalDisplay(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const changeDescription = (e) => {
    setDescrpitionValue(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.h2__form}>{idRegEx.test(urlID) ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={onSubmit} className={styles.form__tasks}>
          <div>
            <label htmlFor="input-description">Description</label>
            <input
              id="input-name"
              name="description"
              required
              value={descriptionValue}
              onChange={changeDescription}
            />
          </div>
          <div>
            <button
              onClick={() => window.location.assign('../tasks')}
              type="button"
              className={`${styles.button__cancel} ${styles.form__button}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button__save} ${styles.form__button}`}
              onClick={idRegEx.test(urlID) ? () => editTask(urlID) : () => createTask()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
}
export default Form;
