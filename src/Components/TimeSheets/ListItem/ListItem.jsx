import React from 'react';

const ListItem = ({ item, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(item._id);
  };
  return (
    <tr className="rows">
      <td>{item.description}</td>
      <td>{item.date}</td>
      <td>{item.hours}</td>
      <td>{item.task.description}</td>
      <td>{item.employee.name}</td>
      <td>{item.project.name}</td>
      <td>
        <button onClick={() => handleDelete(item.id)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <i className="fa-solid fa-pen-to-square"></i>
      </td>
    </tr>
  );
};

export default ListItem;
