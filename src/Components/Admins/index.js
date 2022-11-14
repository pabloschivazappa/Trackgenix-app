import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../redux/admins/thunks';

const Admins = () => {
  const {
    list: adminsList,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const removeAdmins = (id) => {
    dispatch(deleteAdmin(id));
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
            }}
            edit="/admins/form"
          />
        </>
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={!isToConfirm ? modalTitle : 'Delete'}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => removeAdmins(id)}
        >
          {!isToConfirm ? children : 'Are you sure you want to delete it?'}
        </Modal>
      ) : null}
    </section>
  );
};

export default Admins;
