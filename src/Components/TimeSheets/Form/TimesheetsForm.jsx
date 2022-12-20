import React from 'react';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import styles from './timesheets.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimesheet, editTimesheet } from 'redux/timeSheets/thunks';
import { setFetching } from 'redux/timeSheets/actions';
import { getTasks } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/TimeSheets/Form/validations';
import { joiResolver } from '@hookform/resolvers/joi';

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
  const token = sessionStorage.getItem('token');
  const { list: tasksList } = useSelector((state) => state.tasks);
  const { list: projectsList } = useSelector((state) => state.projects);
  const { list: employeesList } = useSelector((state) => state.employees);
  const [values, setValues] = useState({
    description: '',
    hours: '',
    date: '',
    task: '- Select task -',
    employee: '- Select employee -',
    project: '- Select project -'
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: values
  });

  useEffect(async () => {
    dispatch(getTasks());
    dispatch(getProjects());
    dispatch(getEmployees());
    if (haveId) {
      dispatch(setFetching(true));
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
          headers: { token }
        });
        const data = await response.json();
        setValues({
          description: data.data.description,
          hours: data.data.hours,
          date: fixDate(data.data.date),
          task: data.data.task ? data.data.task._id : '- Please select an existing task -',
          employee: data.data.employee
            ? data.data.employee._id
            : '- Please select an existing employee -',
          project: data.data.project
            ? data.data.project._id
            : '- Please select an existing project -'
        });
      } catch (error) {
        console.error(error);
      }
      dispatch(setFetching(false));
    }
  }, []);

  useEffect(() => {
    reset(values);
  }, [values]);

  const addTimesheet = (data) => {
    dispatch(createTimesheet(data));
    setModalDisplay(true);
  };

  const putTimesheet = (data) => {
    dispatch(editTimesheet(id, data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    if (haveId) {
      putTimesheet(data);
      setValues(data);
    } else {
      addTimesheet(data);
    }
  };

  const resetForm = () => {
    reset(values);
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={haveId ? 'Edit' : 'Create'}
        formTitle={haveId ? 'Edit Timesheet' : 'Create Timesheet'}
        resetFunction={() => resetForm()}
      >
        {!fetching ? (
          <>
            <Input
              register={register}
              title="Description"
              name="description"
              error={errors.description?.message}
            />
            <Input
              register={register}
              title="Date"
              type="date"
              name="date"
              error={errors.date?.message}
            />
            <Input register={register} title="Hours" name="hours" error={errors.hours?.message} />
            <div className={styles.select__title}>
              <Select
                register={register}
                list={tasksList}
                name="task"
                kind="description"
                id={id}
                title="Task"
                error={errors.task?.message}
              />
            </div>
            <div className={styles.select__title}>
              <Select
                register={register}
                list={employeesList}
                name="employee"
                kind="name"
                id={id}
                title="Employee"
                error={errors.employee?.message}
              />
            </div>
            <div className={styles.select__title}>
              <Select
                register={register}
                list={projectsList}
                name="project"
                kind="name"
                id={id}
                title="Project"
                error={errors.project?.message}
              />
            </div>
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
