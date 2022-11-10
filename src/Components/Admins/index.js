import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
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

  const deleteItem = async (id) => {
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

  const columns = [
    { heading: 'ID', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'DNI', value: 'dni' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      {!fetching ? (
        <>
          <Table
            data={admins}
            columns={columns}
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              setChildren('¿Are you sure you want to delete it?');
            }}
            edit="/admins/form"
          />
          <Link to="/admins/form" className={styles.newAdmins}>
            +
          </Link>
        </>
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={'Delete admin'}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => deleteItem(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
};

export default Admins;
