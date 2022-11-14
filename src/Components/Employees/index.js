import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployees } from '../../redux/employees/thunks';
import styles from './employees.module.css';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';
import Table from '../Shared/Table';

function Employees() {
  const { list: employees, fetching, children } = useSelector((state) => state.employees);

  const [modalDisplay, setModalDisplay] = useState('');
  // const [children, setChildren] = useState('');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getEmployees());
  }, []);

  const removeEmployees = (id) => {
    dispatch(deleteEmployees(id));
    setIsToConfirm(false);
    // setChildren('Employee deleted');
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
            deleteItem={(id) => {
              setIsToConfirm(true);
              setModalDisplay(true);
              setId(id);
              // setChildren('¿Are you sure you want to delete it?');
            }}
            edit="/employees/form"
          />
        </>
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={'Delete employee'}
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
