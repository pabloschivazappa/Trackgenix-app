import React from 'react';
import Modal from '../../Shared/Modal';
import Spinner from '../../Shared/Spinner';
import Form from '../../Shared/Form';
import Input from '../../Shared/Input';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimesheet, editTimesheet } from '../../../redux/timeSheets/thunks';
import { setFetching } from '../../../redux/timeSheets/actions';

const fixDate = (date) => {
  return date.slice(0, 10);
};

const TimesheetsForm = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  const id = urlParams.get('id');
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const haveId = idRegEx.test(id);
  const { children, modalTitle, fetching } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');

  const [timesheetInput, setTimesheetsInput] = useState({
    date: '',
    description: '',
    task: '',
    hours: '',
    employee: '',
    project: ''
  });

  useEffect(async () => {
    if (haveId) {
      dispatch(setFetching(true));
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
      dispatch(setFetching(false));
    }
  }, []);

  const addTimesheet = () => {
    dispatch(createTimesheet(timesheetInput));
    setModalDisplay(true);
  };

  const putTimesheet = () => {
    dispatch(editTimesheet(id, timesheetInput));
    setModalDisplay(true);
  };

  const onChange = (e) => {
    setTimesheetsInput({ ...timesheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    haveId ? putTimesheet() : addTimesheet();
  };

  return (
    <>
      <Form
        onSubmitFunction={onSubmit}
        buttonMessage={haveId ? 'Edit' : 'Create'}
        formTitle={haveId ? 'Edit Timesheet' : 'Create Timesheet'}
      >
        {!fetching ? (
          <>
            <Input
              title="Description"
              name="description"
              value={timesheetInput.description}
              onChange={onChange}
            />
            <Input
              title="Date"
              type="date"
              name="date"
              value={timesheetInput.date}
              onChange={onChange}
            />
            <Input title="Hours" name="hours" value={timesheetInput.hours} onChange={onChange} />
            <Input title="Task" name="task" value={timesheetInput.task} onChange={onChange} />
            <Input
              title="Employee"
              name="employee"
              value={timesheetInput.employee}
              onChange={onChange}
            />
            <Input
              title="Project"
              name="project"
              value={timesheetInput.project}
              onChange={onChange}
            />
          </>
        ) : (
          <Spinner />
        )}
      </Form>
      {modalDisplay ? (
        <Modal title={modalTitle} setModalDisplay={setModalDisplay}>
          {children}
        </Modal>
      ) : null}
    </>
  );
};

export default TimesheetsForm;
