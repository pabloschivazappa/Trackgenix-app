import styles from './time-sheets.module.css';
import Spinner from '../Spinner';
import { useEffect } from 'react';
import { useState } from 'react';
import ShowList from './ShowList/ShowList';

function TimeSheets() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const data = await response.json();
      setTimesheets(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteTimesheet = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setTimesheets(timesheets.filter((timesheet) => timesheet._id !== id));
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {timesheets.length !== 0 ? (
        <ShowList list={timesheets} deleteTimesheet={deleteTimesheet} />
      ) : (
        <Spinner />
      )}
      <a href="/time-sheets/form">
        <button>
          <i className="fa-solid fa-plus"></i>Add
        </button>
      </a>
    </section>
  );
}

export default TimeSheets;
