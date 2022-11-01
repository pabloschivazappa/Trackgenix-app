import React from 'react';
import styles from './list.module.css';

const List = ({ employees, deleteEmployee }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="last-name">Last name</th>
            <th id="email">Email</th>
            <th id="dni">DNI</th>
            <th id="phone">Phone</th>
            <th id="actions">Actions</th>
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
                    <button>
                      <i className="fa-solid fa-pen-to-square fa-lg"></i>
                    </button>
                  </a>
                  <button onClick={() => deleteEmployee(employee._id)}>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href={'employees/form'}>
        <button className={styles.addbutton}>
          <p>Add employee</p>
          <i className="fa-solid fa-plus fa-lg"></i>
        </button>
      </a>
    </>
  );
};

export default List;
