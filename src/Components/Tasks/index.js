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
      console.log(response.ok);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      saveTasks(filteredTasks);
      setModalTitle('Delete Task');
      if (response.ok) {
        setContentMessage('The task has been deleted');
      } else {
        setContentMessage(() =>
          editAndCreateMessage('Cannot Delete Task', 'The task id was not found')
        );
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
