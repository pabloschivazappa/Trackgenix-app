import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const urlID = urlParams.get('id');
  const [taskData, setTaskData] = useState({ description: '' });

  const [descpritionValue, setDescrpitionValue] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${urlID}`);
      const data = await response.json();
      setTaskData(data.data);
      console.log(taskData.description);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(taskData.description);
  }, [taskData]);

  const editTask = async (urlID) => {
    if (confirm('Edit task?')) {
      await fetch(`http://localhost:5000/tasks/form/${urlID}`, {
        method: 'PUT',
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
      <button type="submit" onClick={() => editTask(urlID)}>
        Save
      </button>
    </div>
  );
}

export default Form;
