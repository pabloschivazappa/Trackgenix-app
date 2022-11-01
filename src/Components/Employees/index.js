import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(employees);
  const deleteEmployee = async (id) => {
    if (confirm('¿Delete employee?')) {
      await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      const newEmployees = employees.filter((employee) => employee._id !== id);
      console.log(newEmployees);
      saveEmployees(newEmployees);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {employees.length > 0 ? (
        <List employees={employees} deleteEmployee={deleteEmployee} />
      ) : (
        <h2>Loading...</h2>
      )}
    </section>
  );
}

export default Employees;
