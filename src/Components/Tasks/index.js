import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import List from './List';
import Modal from './Modal';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const editAndCreateMessage = (contentSubTitle, description) => {
    return `${contentSubTitle}:\n
    Description: ${description}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
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
      const data = await response.json();
      setModalTitle('Delete Task');
      if (data.error === true) {
        setContentMessage(data.message);
      } else {
        setContentMessage(() => editAndCreateMessage(data.message, data.data.description));
      }
      setModalDisplay(true);
    } catch (error) {
      setContentMessage(error);
    }
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Tasks</h2>
        {tasks ? <List list={tasks} deleteTask={deleteTask} /> : <Spinner />}
      </section>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
}

export default Tasks;
