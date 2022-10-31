import React from 'react';

const ListItem = ({ item }) => {
  return (
    <tr className="rows">
      <td>{item.description}</td>
      <td>{item.hours}</td>
      <td>{item.task.description}</td>
      <td>{item.employee.name}</td>
      <td>{item.project.name}</td>
      <td>
        <i className="fa-solid fa-xmark"></i>
        <i className="fa-solid fa-pen-to-square"></i>
      </td>
    </tr>
  );
};

export default ListItem;
