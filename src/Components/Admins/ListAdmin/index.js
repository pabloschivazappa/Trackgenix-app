import React from 'react';
import styles from './ListAdmin.module.css';
import { Link, useHistory } from 'react-router-dom';

const ListAdmin = ({ listAdmin, deleteAdmin }) => {
  const history = useHistory();
  const handleDelete = () => {
    deleteAdmin(listAdmin._id);
  };
  const push = () => {
    history.push('/admins');
  };
  return (
    <tr>
      <td>{listAdmin._id}</td>
      <td>{listAdmin.name}</td>
      <td>{listAdmin.lastName}</td>
      <td>{listAdmin.email}</td>
      <td>{listAdmin.password}</td>
      <td>{listAdmin.dni}</td>
      <td>{listAdmin.phone}</td>
      <td>
        <button onClick={() => handleDelete(listAdmin._id)} className={styles.table__button}>
          X
        </button>
        <Link to={`./admins/form?id=${listAdmin._id}`}>
          <button className={styles.table__button} onClick={push}>
            edit
          </button>
        </Link>
      </td>
    </tr>
  );
};
export default ListAdmin;
