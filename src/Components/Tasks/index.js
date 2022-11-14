import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTasks } from '../../redux/tasks/thunks';
import styles from './tasks.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { setModalTitle, setModalContent } from '../../redux/tasks/actions';

function Tasks() {
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const {
    list: tasks,
    fetching,
    children,
    error,
    modalTitle
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const deleteItem = (id) => {
    dispatch(deleteTasks(id));
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Description', value: 'description' },
    { heading: 'Actions' }
  ];

  return (
    <>
      <section className={styles.container}>
        {!fetching ? (
          <>
            <Table
              title="Tasks"
              data={tasks}
              error={error}
              columns={columns}
              deleteItem={(id) => {
                dispatch(setModalTitle('Delete'));
                dispatch(setModalContent('Are you sure you want to delete it?'));
                setIsToConfirm(true);
                setModalDisplay(true);
                setId(id);
              }}
              edit="/tasks/form"
            />
          </>
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={modalTitle}
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

export default Tasks;
