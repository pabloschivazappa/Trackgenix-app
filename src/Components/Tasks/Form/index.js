import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [descpritionValue, setDescrpitionValue] = useState('');

  if (idRegEx.test(urlID)) {
    useEffect(async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${urlID}`);
        const data = await response.json();
        setDescrpitionValue(data.data.description);
      } catch (error) {
        console.log(error);
      }
    }, []);
  }

  const editTask = async (urlID) => {
    if (confirm('Edit task?')) {
      await fetch(`http://localhost:5000/tasks/${urlID}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descpritionValue })
      });
    }
  };

  const createTask = async () => {
    if (confirm('Create task?')) {
      await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ description: descpritionValue })
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
            value={descpritionValue}
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
    </div>
  );
}

export default Form;
