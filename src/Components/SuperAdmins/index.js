import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import List from './List';
import Modal from './Modal';
import Spinner from '../Spinner';

function SuperAdmins() {
  const [superAdmins, saveSuperAdmins] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const deleteMessage = (contentSubTitle, name, lastName, email, password, dni, phone) => {
    return ` ${contentSubTitle}:\n
  Name: ${name}
  Last Name: ${lastName}
  Email: ${email}
  Password: ${password}
  Dni: ${dni}
  Phone: ${phone}
  `;
  };

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
    if (confirm('¿Delete super admin?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
          method: 'DELETE'
        });
        const newSuperAdmins = superAdmins.filter((superAdmin) => superAdmin._id !== id);
        saveSuperAdmins(newSuperAdmins);
        const data = await response.json();
        setModalTitle('Create super admin');
        if (data.error === true) {
          setContentMessage(data.message);
        } else {
          setContentMessage(() =>
            deleteMessage(
              data.message,
              data.data.name,
              data.data.lastName,
              data.data.email,
              data.data.password,
              data.data.dni,
              data.data.phone
            )
          );
        }
      } catch (error) {
        setContentMessage(error);
      }
      setModalDisplay(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      {superAdmins.length > 0 ? (
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
