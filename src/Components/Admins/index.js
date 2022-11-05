import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List/index';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async (id) => {
    if (confirm('Are you sure that you want to delete the Admin?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (!data.error) {
          setAdmins([...admins.filter((admin) => admin._id !== id)]);
          alert('Success');
        } else {
          alert('Error');
        }
      } catch (error) {
        console.error(error);
      }
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
