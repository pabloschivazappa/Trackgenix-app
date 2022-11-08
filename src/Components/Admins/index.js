import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List/index';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
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
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });
      const newAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(newAdmins);
      if (!response.ok) {
        setChildren('Cannot delete admin');
      } else {
        setChildren('Admin deleted successfully');
      }
    } catch (error) {
      setChildren(error);
    }
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      {!fetching ? (
        <List
          list={admins}
          setList={setAdmins}
          deleteAdmin={(id) => {
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
          title={'Delete admin'}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => deleteAdmin(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
};

export default Admins;
