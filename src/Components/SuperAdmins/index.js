import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import List from './List';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(superAdmins);
  const deleteSuperAdmin = async (id) => {
    if (confirm('¿Delete super admin?')) {
      await fetch(`http://localhost:5000/super-admins/${id}`, {
        method: 'DELETE'
      });
      const newSuperAdmins = superAdmins.filter((superAdmin) => superAdmin._id !== id);
      console.log(newSuperAdmins);
      saveSuperAdmins(newSuperAdmins);
    }
  };

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      {superAdmins ? (
        <List superAdmins={superAdmins} deleteSuperAdmin={deleteSuperAdmin} />
      ) : (
        <h2>Loading...</h2>
      )}
    </section>
  );
}

export default SuperAdmins;
