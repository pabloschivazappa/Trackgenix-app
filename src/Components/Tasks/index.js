import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTasks } from '../../redux/tasks/thunks';
import styles from './tasks.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

function Tasks() {
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const { list: tasks, fetching, children } = useSelector((state) => state.tasks);

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
              columns={columns}
              deleteItem={(id) => {
                setIsToConfirm(true);
                setModalDisplay(true);
                setId(id);
                // setChildren('¿Are you sure you want to delete it?');
              }}
              edit="/tasks/form"
            />
          </>
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={'Are you sure you want to delete Task?'}
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
