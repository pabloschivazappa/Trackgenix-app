import React from 'react';
import styles from './list.module.css';

const List = ({ employees, deleteEmployee }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="last-name">Last name</th>
            <th id="email">Email</th>
            <th id="dni">DNI</th>
            <th id="phone">Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.dni}</td>
                <td>{employee.phone}</td>
                <td>
                  <a href={`employees/form?id=${employee._id}`}>
                    <button>Edit</button>
                  </a>
                  <button onClick={() => deleteEmployee(employee._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href={'employees/form'}>
        <button>Add</button>
      </a>
    </div>
  );
};

export default List;
