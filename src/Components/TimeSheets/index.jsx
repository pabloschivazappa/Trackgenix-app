import styles from './time-sheets.module.css';
import Spinner from '../Shared/Spinner';
import { useEffect, useState } from 'react';
import ShowList from './ShowList/ShowList';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';

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

  const deleteTimesheet = async (id) => {
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

  return (
    <>
      <section className={styles.container}>
        <h2>TimeSheets</h2>
        {!fetching ? (
          <ShowList
            list={timesheets}
            deleteTimesheet={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              setChildren('¿Are you sure you want to delete it?');
            }}
          />
        ) : (
          <Spinner />
        )}
        <Link to="/time-sheets/form">
          <button className={styles.add__button}>
            <i className="fa-solid fa-plus"></i>Add
          </button>
        </Link>
        {modalDisplay ? (
          <Modal
            title={'Delete super admin'}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => deleteTimesheet(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default TimeSheets;
