import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import List from './List';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/tasks');
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
    if (confirm('¿Delete task?')) {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      const filteredTasks = tasks.filter((task) => task._id !== id);
      saveTasks(filteredTasks);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {tasks ? <List list={tasks} deleteTask={deleteTask} /> : <Spinner />}
    </section>
  );
}

export default Tasks;
