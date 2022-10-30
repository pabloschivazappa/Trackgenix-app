import React from 'react';
import styles from './list.module.css';

const List = ({ superAdmins, deleteSuperAdmin }) => {
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
          {superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.name}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>{superAdmin.dni}</td>
                <td>{superAdmin.phone}</td>
                <td>
                  <a href={`super-admins/form?id=${superAdmin._id}`}>
                    <button>Edit</button>
                  </a>
                  <button onClick={() => deleteSuperAdmin(superAdmin._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
