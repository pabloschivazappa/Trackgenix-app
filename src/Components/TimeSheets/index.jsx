import styles from './time-sheets.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

function TimeSheets() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/timesheets`);
      const data = await response.json();
      setTimesheets(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(timesheets.data);
  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <div>
        {timesheets.data
          ? timesheets.data.map((timesheet) => {
              return <div key={timesheet._id}>{timesheet.description}</div>;
            })
          : console.log()}
      </div>
    </section>
  );
}

export default TimeSheets;
