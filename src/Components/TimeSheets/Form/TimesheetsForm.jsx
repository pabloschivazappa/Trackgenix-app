import React from 'react';
import styles from './Form.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal.jsx';

const fixDate = (date) => {
  return date.slice(0, 10);
};

const TimesheetsForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const haveId = idRegEx.test(id);

  const [timesheetInput, setTimesheetsInput] = useState({
    date: '',
    description: '',
    task: '',
    hours: '',
    employee: '',
    project: ''
  });

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  if (haveId) {
    useEffect(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`);
        const data = await response.json();
        setTimesheetsInput({
          description: data.data.description,
          hours: data.data.hours,
          date: fixDate(data.data.date),
          task: data.data.task._id,
          employee: data.data.employee._id,
          project: data.data.project._id
        });
      } catch (error) {
        console.error(error);
      }
    }, []);
  }

  const createTimesheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheetInput)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
    } catch (error) {
      setModalTitle('Error');
      setContentMessage(error);
    }
    setModalDisplay(true);
  };

  const editTimesheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheetInput)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
    } catch (error) {
      setModalTitle('Error');
      setContentMessage(error);
    }
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setTimesheetsInput({ ...timesheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    haveId ? editTimesheet() : createTimesheet();
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.h2__form}>{haveId ? 'Edit' : 'Create'}</h2>
        <form onSubmit={onSubmit} className={styles.form__timesheets}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={timesheetInput.description}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              id="date"
              name="date"
              value={timesheetInput.date}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Hours:
            <input
              type="text"
              id="hours"
              name="hours"
              value={timesheetInput.hours}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Task ID:
            <input
              type="text"
              id="task"
              name="task"
              value={timesheetInput.task}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Employee ID:
            <input
              type="text"
              id="employee"
              name="employee"
              value={timesheetInput.employee}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Project ID:
            <input
              type="text"
              id="project"
              name="project"
              value={timesheetInput.project}
              onChange={onChange}
              required
            />
          </label>
          <button type="submit" className={`${styles.button__save} ${styles.form__button}`}>
            {haveId ? 'Edit' : 'Create'}
          </button>
        </form>
      </div>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
};

export default TimesheetsForm;
