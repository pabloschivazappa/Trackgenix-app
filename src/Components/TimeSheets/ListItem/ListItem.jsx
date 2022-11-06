import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ item, deleteTimesheet }) => {
  const handleDelete = () => {
    deleteTimesheet(item._id);
  };
  return (
    <tr className="rows">
      <td>{item.description}</td>
      <td>{item.date.slice(0, 10)}</td>
      <td>{item.hours}</td>
      <td>{item.task ? item.task.description : 'The task is not in the DB'}</td>
      <td>{item.employee ? item.employee.name : 'The employee is not in the DB'}</td>
      <td>{item.project ? item.project.name : 'The project is not in the DB'}</td>
      <td>
        <button onClick={() => handleDelete(item._id)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <Link to={`/time-sheets/form?id=${item._id}`}>
          <button>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ListItem;
