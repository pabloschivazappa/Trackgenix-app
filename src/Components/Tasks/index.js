import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import List from './List';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (tasks.data) {
    return (
      <section className={styles.container}>
        <List list={tasks} setList={setTasks} />
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <Spinner />
      </section>
    );
  }
}

export default Tasks;
