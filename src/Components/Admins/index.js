import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const { list: adminsList, fetching, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
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
      {!fetching ? (
        <>
          <Table
            title="Admins"
            data={adminsList}
            error={error}
            columns={columns}
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              setChildren('¿Are you sure you want to delete it?');
            }}
            edit="/admins/form"
          />
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
