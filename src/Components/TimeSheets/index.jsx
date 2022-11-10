import styles from './time-sheets.module.css';
import Spinner from '../Shared/Spinner';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';

function TimeSheets() {
  const [timesheets, setTimesheets] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const data = await response.json();
      setFetching(false);
      if (response.ok) {
        setTimesheets(data.data);
      } else {
        setTimesheets([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
      });
      const newTimesheets = timesheets.filter((timesheet) => timesheet._id !== id);
      setTimesheets(newTimesheets);
      setChildren('¿Are you sure you want to delete it?');
      if (!response.ok) {
        setChildren('Cannot delete timesheet');
      } else {
        setChildren('Timesheet deleted successfully');
      }
    } catch (error) {
      setChildren(error);
    }
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Description', value: 'description' },
    { heading: 'Date', value: 'date' },
    { heading: 'Project', value: 'project' },
    { heading: 'Task', value: 'task' },
    { heading: 'Employee', value: 'employee' },
    { heading: 'Hours', value: 'hours' },
    { heading: 'Actions' }
  ];

  return (
    <>
      <section className={styles.container}>
        <h2>TimeSheets</h2>
        {!fetching ? (
          <Table
            data={timesheets}
            columns={columns}
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              setChildren('¿Are you sure you want to delete it?');
            }}
            edit="/time-sheets/form"
          />
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={'Delete super admin'}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => deleteItem(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default TimeSheets;
