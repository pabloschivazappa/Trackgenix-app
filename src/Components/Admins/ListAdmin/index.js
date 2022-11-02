import React from 'react';

const ListAdmin = ({ listAdmin, deleteAdmin }) => {
  const handleDelete = () => {
    deleteAdmin(listAdmin._id);
  };
  return (
    <tr className="rows">
      <td>{listAdmin._id}</td>
      <td>{listAdmin.name}</td>
      <td>{listAdmin.lastName}</td>
      <td>{listAdmin.email}</td>
      <td>{listAdmin.password}</td>
      <td>{listAdmin.dni}</td>
      <td>{listAdmin.phone}</td>
      <td>
        <button onClick={() => handleDelete(listAdmin._id)}>X</button>
        <a href={`./admins/form-admins?id=${listAdmin._id}`}>
          <button>edit</button>
        </a>
      </td>
    </tr>
  );
};
export default ListAdmin;
