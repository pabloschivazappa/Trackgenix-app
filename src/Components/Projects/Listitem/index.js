import React from 'react';

const ListItem = ({ listItem }) => {
  return (
    <tr className="rows">
      <td>{listItem.name}</td>
      <td>{listItem.description}</td>
      <td>{listItem.clientName}</td>
      <td>{listItem.createdAt}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.updatedAt}</td>
      <td>{listItem.endDate}</td>
    </tr>
  );
};

export default ListItem;
