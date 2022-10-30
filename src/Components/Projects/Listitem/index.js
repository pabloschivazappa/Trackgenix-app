import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

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
      <td>{listItem.endDate}</td>
      <td>
        <FaTimes
          style={{
            color: 'red',
            cursor: 'pointer',
            padding: '5px',
            width: '20px',
            height: '20px',
            paddingRight: '15px'
          }}
        />
        <FaEdit style={{ cursor: 'pointer', padding: '5px', width: '20px', height: '20px' }} />
      </td>
    </tr>
  );
};

export default ListItem;
