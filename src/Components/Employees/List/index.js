import React from 'react';
import styles from './list.module.css';
import { Link } from 'react-router-dom';

const List = ({ employees, deleteEmployee }) => {
  return (
    <>
      {employees.length !== 0 ? (
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
                    <Link to={`employees/form?id=${employee._id}`}>
                      <button>
                        <i className="fa-solid fa-pen-to-square fa-lg"></i>
                      </button>
                    </Link>
                    <button onClick={() => deleteEmployee(employee._id)}>
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.empty__list}>Empty list</p>
      )}
      <Link to={'employees/form'}>
        <button className={styles.addbutton}>
          <p>Add employee</p>
          <i className="fa-solid fa-plus fa-lg"></i>
        </button>
      </Link>
    </>
  );
};

export default List;
