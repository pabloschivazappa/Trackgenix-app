import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List';
import Modal from './Modal';
import Spinner from '../Spinner';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const deleteMessage = (contentSubTitle, description) => {
    return `${contentSubTitle}:\n
    Description: ${description}`;
  };

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
    if (confirm('¿Delete employee?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          method: 'DELETE'
        });
        const newEmployees = employees.filter((employee) => employee._id !== id);
        saveEmployees(newEmployees);
        setModalTitle('Delete employee');

        if (response.ok) {
          setContentMessage('Employee deleted');
        } else {
          setContentMessage(() =>
            deleteMessage('Error while deleting Employee', 'Employee id not found.')
          );
        }
        setModalDisplay(true);
      } catch (error) {
        setContentMessage(error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {employees.length > 0 ? (
        <List employees={employees} deleteEmployee={deleteEmployee} />
      ) : (
        //<h2>Loading...</h2>
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

export default Employees;
