import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [descriptionValue, setDescrpitionValue] = useState('');

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
    if (confirm('Edit task?')) {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${urlID}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
    }
  };

  const createTask = async () => {
    if (confirm('Create task?')) {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descriptionValue })
      });
    }
  };

  const changeDescription = (e) => {
    setDescrpitionValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form>
        <h1>Form</h1>
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
      </form>
      <button
        type="submit"
        onClick={idRegEx.test(urlID) ? () => editTask(urlID) : () => createTask()}
      >
        Save
      </button>
      <a href="http://localhost:3000/tasks">
        <button>Cancel</button>
      </a>
    </div>
  );
}

export default Form;
