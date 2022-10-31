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
      console.log(timesheets);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(timesheets);

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {timesheets.length !== 0 ? <ShowList list={timesheets} /> : <Spinner />}
    </section>
  );
}

export default TimeSheets;
