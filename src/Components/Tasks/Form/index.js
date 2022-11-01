import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [descriptionValue, setDescrpitionValue] = useState('');

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (contentSubTitle, description) => {
    return `${contentSubTitle}:\n
     Description: ${description}`;
  };

  if (idRegEx.test(urlID)) {
    useEffect(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`);
        const data = await response.json();
        setDescrpitionValue(data.data.description);
      } catch (error) {
        console.log(error);
      }
    }, []);
  }

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
        setContentMessage(data.message);
      } else {
        setContentMessage(() => editAndCreateMessage(data.message, data.data.description));
      }
      setModalDisplay(true);
    } catch (error) {
      setContentMessage(error);
    }
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
        setContentMessage(data.message);
      } else {
        setContentMessage(() => editAndCreateMessage(data.message, data.data.description));
      }
      setModalDisplay(true);
    } catch (error) {
      setContentMessage(error);
    }
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
        <form onSubmit={onSubmit}>
          <h2>{idRegEx.test(urlID) ? 'Edit Task' : 'Create Task'}</h2>
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
            <a href={'http://localhost:3000/tasks'}>
              <button type="button" className={styles.buttonCancel}>
                Cancel
              </button>
            </a>
            <button
              type="submit"
              className={styles.buttonSave}
              onClick={idRegEx.test(urlID) ? () => editTask(urlID) : () => createTask()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
}
export default Form;
