import React from 'react';
import styles from './list.module.css';

const List = ({ superAdmins, deleteSuperAdmin }) => {
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
                    <button>
                      <i className="fa-solid fa-pen-to-square fa-lg"></i>
                    </button>
                  </a>
                  <button onClick={() => deleteSuperAdmin(superAdmin._id)}>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href={'super-admins/form'}>
        <button className={styles.addbutton}>
          <p>Add super admin</p>
          <i className="fa-solid fa-plus fa-lg"></i>
        </button>
      </a>
    </>
  );
};

export default List;
