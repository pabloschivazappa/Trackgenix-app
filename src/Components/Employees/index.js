import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployees } from '../../redux/employees/thunks';
import styles from './employees.module.css';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import Table from '../Shared/Table';
import { setModalTitle, setModalContent } from '../../redux/employees/actions';

function Employees() {
  const {
    list: employees,
    fetching,
    children,
    error,
    modalTitle
  } = useSelector((state) => state.employees);

  const [modalDisplay, setModalDisplay] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getEmployees());
  }, []);

  const removeEmployees = (id) => {
    dispatch(deleteEmployees(id));
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
            title="Employees"
            data={employees}
            columns={columns}
            errror={error}
            deleteItem={(id) => {
              dispatch(setModalTitle('Delete'));
              dispatch(setModalContent('Are you sure you want to delete it?'));
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
            }}
            edit="/employees/form"
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
          onClickFunction={() => removeEmployees(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
}

export default Employees;
