import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:5000/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div>
        {superAdmins.data?.map((superAdmin) => {
          return (
            <a href="/super-admins/form" key={superAdmin._id}>
              {superAdmin.name}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default SuperAdmins;
