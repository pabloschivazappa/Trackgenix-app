import styles from './time-sheets.module.css';
import Spinner from '../Spinner';
import { useEffect } from 'react';
import { useState } from 'react';
import ShowList from './ShowList/ShowList';

function TimeSheets() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/timesheets`);
      const data = await response.json();
      setTimesheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (id) => {
    fetch(`http://localhost:5000/timesheets/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((json) => {
        setTimesheets(timesheets.filter((timesheet) => timesheet._id !== id));
        alert(json.message);
      })
      .catch((error) => {
        alert(`Error ${error.status} : ${error.statusText}`);
      });
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {timesheets.length !== 0 ? (
        <ShowList list={timesheets} deleteItem={deleteItem} />
      ) : (
        <Spinner />
      )}
    </section>
  );
}

export default TimeSheets;
