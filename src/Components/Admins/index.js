import React, { useEffect, useState } from 'react';
import styles from './Admins.module.css';
import List from './List/index';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}admins`);
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }, [admins]);

  // eslint-disable-next-line no-unused-vars
  const deleteAdmin = (id) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}admins/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        <List list={admins} setList={setAdmins} deleteAdmin={deleteAdmin} />
      </div>
    </section>
  );
};

export default Admins;
