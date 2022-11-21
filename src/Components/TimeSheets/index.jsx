import { useEffect, useState } from 'react';
import styles from 'Components/TimeSheets/time-sheets.module.css';
import Spinner from 'Components/Shared/Spinner';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets, deleteTimesheet } from 'redux/timeSheets/thunks';
import { setModalTitle, setModalContent } from 'redux/timeSheets/actions';

const TimeSheets = () => {
  const {
    list: timesheetsList,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.timeSheets);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const removeTimesheets = () => {
    dispatch(deleteTimesheet(id));
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
        {!fetching ? (
          <Table
            title="Timesheets"
            data={timesheetsList}
            error={error}
            columns={columns}
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
            }}
            edit="/time-sheets/form"
          />
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={modalTitle}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => removeTimesheets()}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
};

export default TimeSheets;
