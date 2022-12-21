import React from 'react';
import Spinner from 'Components/Shared/Spinner';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import styles from './timesheets.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimesheet } from 'redux/timeSheets/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { schema } from 'Components/TimeSheets/FormToProjects/validations';
import { joiResolver } from '@hookform/resolvers/joi';

const TimesheetsFormToProjects = ({ setIsForm, projectId }) => {
  const { fetching } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
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
  };

  const onSubmit = async (data) => {
    setIsForm(false);
    addTimesheet({ ...data, employee: employeeId, project: projectId });
  };

  return (
    <>
      <Form onSubmitFunction={handleSubmit(onSubmit)} buttonMessage={'Create'} isInModal={true}>
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
    </>
  );
};

export default TimesheetsFormToProjects;
