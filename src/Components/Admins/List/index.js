import React from 'react';
import ListAdmin from '../ListAdmin';
import styles from './List.module.css';

const List = ({ list, deleteAdmin }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="name">Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email</th>
            <th id="password">Password</th>
            <th id="dni">DNI</th>
            <th id="phone">Phone</th>
          </tr>
        </thead>
        <tbody>
          {list.data?.map((admin) => {
            return <ListAdmin key={admin._id} listAdmin={admin} deleteAdmin={deleteAdmin} />;
          })}
        </tbody>
      </table>
      <a href="./admins/form-admins">
        <button>Add a new Admin</button>
      </a>
    </>
  );
};

export default List;
