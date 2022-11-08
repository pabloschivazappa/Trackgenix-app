import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import List from './List';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      saveSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      const newSuperAdmins = superAdmins.filter((superAdmin) => superAdmin._id !== id);
      saveSuperAdmins(newSuperAdmins);
      if (!response.ok) {
        setChildren('Cannot delete super admin');
      } else {
        setChildren('Super Admin deleted successfully');
      }
    } catch (error) {
      setChildren(error);
    }
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.super__admin__h2}>Super Admins</h2>
      {superAdmins.length > 0 ? (
        <List
          superAdmins={superAdmins}
          deleteSuperAdmin={(id) => {
            setIsToConfirm(true);
            setModalDisplay(true);
            setId(id);
            setChildren('¿Are you sure you want to delete it?');
          }}
        />
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={'Delete super admin'}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => deleteSuperAdmin(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
}

export default SuperAdmins;
