import React from 'react';

const ListItem = ({ item, deleteTimesheet }) => {
  const handleDelete = () => {
    deleteTimesheet(item._id);
  };
  return (
    <tr className="rows">
      <td>{item.description}</td>
      <td>{item.date.slice(0, 10)}</td>
      <td>{item.hours}</td>
      <td>{item.task.description}</td>
      <td>{item.employee.name}</td>
      <td>{item.project.name}</td>
      <td>
        <button onClick={() => handleDelete(item._id)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <a href={`/time-sheets/form?id=${item._id}`}>
          <button>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </a>
      </td>
    </tr>
  );
};

export default ListItem;
