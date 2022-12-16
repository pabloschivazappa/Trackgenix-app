import React from 'react';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import styles from './timesheets.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimesheet } from 'redux/timeSheets/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/TimeSheets/FormToProjects/validations';
import { joiResolver } from '@hookform/resolvers/joi';

const TimesheetsFormToProjects = ({ projectId }) => {
  const { children, modalTitle, fetching } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const { id: employeeId } = useSelector((state) => state.auth);
  const { list: tasksList } = useSelector((state) => state.tasks);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(async () => {
    dispatch(getTasks());
  }, []);

  const addTimesheet = (data) => {
    dispatch(createTimesheet(data));
    setModalDisplay(true);
  };

  const onSubmit = async (data) => {
    console.log('Data: ', data);
    console.log('Data 2: ', { ...data, employee: employeeId, project: projectId });
    addTimesheet({ ...data, employee: employeeId, project: projectId });
  };

  return (
    <>
      <Form
        onSubmitFunction={handleSubmit(onSubmit)}
        buttonMessage={'Create'}
        formTitle={'Create Timesheet'}
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
                id={tasksList._id}
                title="Task"
                error={errors.task?.message}
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

export default TimesheetsFormToProjects;
