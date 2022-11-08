import { useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner';
import List from './List';
import Modal from '../Shared/Modal';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      if (response.ok) {
        saveTasks(data.data);
      } else {
        saveTasks([]);
      }
      setFetching(false);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      const filteredTasks = tasks.filter((task) => task._id !== id);
      saveTasks(filteredTasks);
      if (response.ok) {
        setChildren('The task has been deleted');
      } else {
        setChildren('Cannot delete task');
      }
    } catch (error) {
      setChildren(error);
    }
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Tasks</h2>
        {!fetching ? (
          <List
            list={tasks}
            deleteTask={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              setChildren('¿Are you sure you want to delete it?');
            }}
          />
        ) : (
          <Spinner />
        )}
        {modalDisplay ? (
          <Modal
            title={'Delete super admin'}
            setModalDisplay={setModalDisplay}
            isToConfirm={isToConfirm}
            onClickFunction={() => deleteTask(id)}
          >
            {children}
          </Modal>
        ) : null}
      </section>
    </>
  );
}

export default Tasks;
