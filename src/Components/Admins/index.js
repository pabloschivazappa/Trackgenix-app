import React, { useEffect, useState } from 'react';
import styles from 'Components/Admins/admins.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, editAdmin } from 'redux/admins/thunks';
import { setModalTitle, setModalContent } from 'redux/admins/actions';

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
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const removeAdmins = (id) => {
    const foundAdmin = adminsList.find((admin) => admin._id === id);
    dispatch(
      editAdmin(
        id,
        {
          name: foundAdmin.name,
          lastName: foundAdmin.lastName,
          email: foundAdmin.email,
          dni: foundAdmin.dni,
          phone: foundAdmin.phone,
          firebaseUid: foundAdmin.firebaseUid,
          active: false
        },
        true
      )
    );
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
    data === 'SUPER_ADMIN' && { heading: 'Actions' }
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
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
            }}
            edit="/admins/form"
            canCreate={data === 'SUPER_ADMIN'}
          />
        </>
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => removeAdmins(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
};

export default Admins;
