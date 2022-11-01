import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List/index';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/admins`);
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }, [admins]);

  // eslint-disable-next-line no-unused-vars
  const deleteItem = (id) => {
    try {
      fetch(`http://localhost:5000/admins/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        <List list={admins} setList={setAdmins} deleteItem={deleteItem} />
      </div>
    </section>
  );
};

export default Admins;
