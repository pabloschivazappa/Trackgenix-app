import styles from './time-sheets.module.css';
import Spinner from '../Spinner';
import { useEffect } from 'react';
import { useState } from 'react';
import ShowList from './ShowList/ShowList';
import Modal from './Modal/Modal';

function TimeSheets() {
  const [timesheets, setTimesheets] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const data = await response.json();
      setTimesheets(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTimesheet = async (id) => {
    if (confirm('Are you sure that you want to delete the task?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setContentMessage(data.message);
        if (response.ok) {
          setTimesheets(timesheets.filter((timesheet) => timesheet._id !== id));
          setModalTitle('Success');
          setContentMessage('The timesheet was successfully deleted');
        } else {
          setModalTitle('Error');
          setContentMessage('Cannot delete the timesheet');
        }
      } catch (error) {
        setModalTitle('Error');
        setContentMessage(error);
      }
      setModalDisplay(true);
    }
  };

  return (
    <>
      <section className={styles.container}>
        <h2>TimeSheets</h2>
        {timesheets ? (
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

export default TimeSheets;
