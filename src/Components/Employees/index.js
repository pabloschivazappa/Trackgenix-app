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

  const deleteMessage = (contentSubTitle, name, lastName, email, password, dni, phone) => {
    return ` ${contentSubTitle}:\n
  Name: ${name}
  Last Name: ${lastName}
  Email: ${email}
  Password: ${password}
  Dni: ${dni}
  Phone: ${phone}
  `;
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

        const data = await response.json();
        setModalTitle('Delete employee');
        if (data.error === true) {
          setContentMessage(data.message);
        } else {
          setContentMessage(() =>
            deleteMessage(
              data.message,
              data.data.name,
              data.data.lastName,
              data.data.email,
              data.data.password,
              data.data.dni,
              data.data.phone
            )
          );
        }
      } catch (error) {
        setContentMessage(error);
      }
      setModalDisplay(true);
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
