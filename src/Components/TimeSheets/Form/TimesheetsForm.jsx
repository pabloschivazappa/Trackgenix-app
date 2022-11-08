import React from 'react';
import styles from './Form.module.css';
import { useState, useEffect } from 'react';
import Modal from '../../Shared/Modal';

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
  const [children, setChildren] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (
    contentSubTitle,
    description,
    hours,
    date,
    task,
    employee,
    project
  ) => {
    return ` ${contentSubTitle}:\n
  Description: ${description}
  Hours: ${hours}
  Date: ${date}
  Task: ${task}
  Employee: ${employee}
  Project: ${project}
  `;
  };

  useEffect(async () => {
    if (haveId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`);
        const data = await response.json();
        setTimesheetsInput({
          description: data.data.description,
          hours: data.data.hours,
          date: fixDate(data.data.date),
          task: data.data.task ? data.data.task._id : 'not found',
          employee: data.data.employee ? data.data.employee._id : 'not found',
          project: data.data.project ? data.data.project._id : 'not found'
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const createTimesheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheetInput)
      });
      const data = await response.json();
      setModalTitle('Create timesheet');
      if (!response.ok) {
        setChildren(data.message);
      } else {
        setChildren(() =>
          editAndCreateMessage(
            data.message,
            data.data.description,
            data.data.hours,
            fixDate(data.data.date),
            data.data.task,
            data.data.employee,
            data.data.project
          )
        );
      }
    } catch (error) {
      setChildren(error);
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
      setModalTitle('Edit timesheet');
      if (!response.ok) {
        setChildren(data.message);
      } else {
        setChildren(() =>
          editAndCreateMessage(
            data.message,
            data.data.description,
            data.data.hours,
            fixDate(data.data.date),
            data.data.task,
            data.data.employee,
            data.data.project
          )
        );
      }
    } catch (error) {
      setChildren(error);
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
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
};

export default TimesheetsForm;
