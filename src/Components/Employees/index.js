import { useEffect, useState } from 'react';
import styles from './employees.module.css';
//import List from './List';
import Modal from './Modal';
import Spinner from '../Shared/Spinner';
import { Link } from 'react-router-dom';
import Table from '../Shared/Table';

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

  const columns = [
    { heading: 'Name', value: 'name' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'DNI', value: 'dni' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'Actions' }
  ];

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {employees.length > 0 ? (
        <>
          <Table
            data={employees}
            columns={columns}
            deleteItem={deleteEmployee}
            edit="/employees/form"
          />
          <Link to="/employees/form" className={styles.newEmployee}>
            +
          </Link>
        </>
      ) : (
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
