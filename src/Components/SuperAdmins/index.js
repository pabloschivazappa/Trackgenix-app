import { useEffect, useState } from 'react';
import styles from 'Components/SuperAdmins/super-admins.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from 'redux/superAdmins/thunks';
import { setModalTitle, setModalContent } from 'redux/superAdmins/actions';

const SuperAdmins = () => {
  const {
    list: superAdminsList,
    fetching,
    error,
    children,
    modalTitle
  } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const removeSuperAdmins = (id) => {
    dispatch(deleteSuperAdmin(id));
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
            title="Super Admins"
            data={superAdminsList}
            error={error}
            columns={columns}
            deleteItem={(id) => {
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
            }}
            edit="/super-admins/form"
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
          onClickFunction={() => removeSuperAdmins(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
};

export default SuperAdmins;
