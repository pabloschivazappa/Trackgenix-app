import React from 'react';
import styles from './Form.module.css';
import { useState } from 'react';
/* import { useState } from 'react'; */
const urlValues = window.location.search;
const urlParams = new URLSearchParams(urlValues);
const product = urlParams.get('id');
console.log(product);
/* const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i; */

const TimesheetsForm = () => {
  const [timesheetInput, setTimesheetsInput] = useState({
    date: '',
    description: '',
    task: '',
    hours: '',
    employee: '',
    project: ''
  });

  const onChange = (e) => {
    setTimesheetsInput({ ...timesheetInput, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(timesheetInput);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheetInput)
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        alert(data);
      } else {
        alert('Error');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TimesheetsForm;
