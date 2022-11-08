import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List/index';
import Spinner from '../Shared/Spinner';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      if (response.ok) {
        setAdmins(data.data);
      } else {
        setAdmins([]);
      }
      setFetching(false);
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
        setAdmins([...admins.filter((admin) => admin._id !== id)]);
        const data = await response.json();
        if (!data.error) {
          setAdmins(admins.filter((admin) => admin._id !== id));
          alert('Admin deleted');
        } else {
          alert('Can not delete admin');
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
        {!fetching ? (
          <List list={admins} setList={setAdmins} deleteAdmin={deleteAdmin} />
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};

export default Admins;
