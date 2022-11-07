import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import List from './List';
import Modal from './Modal';
import Spinner from '../Shared/Spinner';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      if (response.ok) {
        saveSuperAdmins(data.data);
      } else {
        saveSuperAdmins([]);
      }
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (id) => {
    if (confirm('¿Delete super admin?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
          method: 'DELETE'
        });
        const newSuperAdmins = superAdmins.filter((superAdmin) => superAdmin._id !== id);
        saveSuperAdmins(newSuperAdmins);
        setModalTitle('Delete super admin');
        if (!response.ok) {
          setContentMessage('Cannot delete super admin');
        } else {
          setContentMessage('Super Admin deleted successfully');
        }
      } catch (error) {
        setContentMessage(error);
      }
      setModalDisplay(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.super__admin__h2}>Super Admins</h2>
      {!fetching ? (
        <List superAdmins={superAdmins} deleteSuperAdmin={deleteSuperAdmin} />
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </section>
  );
}

export default SuperAdmins;
