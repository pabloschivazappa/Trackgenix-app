import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [children, setChildren] = useState('¿Are you sure you want to delete it?');
  const [isToConfirm, setIsToConfirm] = useState(false);
  const [id, setId] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      const newEmployees = employees.filter((employee) => employee._id !== id);
      saveEmployees(newEmployees);
      if (!response.ok) {
        setChildren('Cannot delete employee');
      } else {
        setChildren('Employee deleted successfully');
      }
    } catch (error) {
      setChildren(error);
    }
    setIsToConfirm(false);
    setModalDisplay(true);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {employees.length > 0 ? (
        <List
          employees={employees}
          deleteEmployee={(id) => {
            setIsToConfirm(true);
            setModalDisplay(true);
            setId(id);
          }}
        />
      ) : (
        <Spinner />
      )}
      {modalDisplay ? (
        <Modal
          title={'Delete employee'}
          setModalDisplay={setModalDisplay}
          isToConfirm={isToConfirm}
          onClickFunction={() => deleteEmployee(id)}
        >
          {children}
        </Modal>
      ) : null}
    </section>
  );
}

export default Employees;
