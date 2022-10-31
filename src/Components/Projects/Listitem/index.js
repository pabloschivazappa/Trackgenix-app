import { FaTimes, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { DeleteModal } from '../Modals/deleteModal';
import { EditModal } from '../Modals/editModal';
import './listItem.module.css';

const ListItem = ({ listItem }) => {
  const employee = listItem.employees.find((employee) => employee);

  const [crossmodalState, crossChangeModalState] = useState(false);
  const [editModalState, editChangeModalState] = useState(false);

  return (
    <tr className="rows">
      <td>{listItem.name}</td>
      <td>{listItem.description}</td>
      <td>{listItem.clientName}</td>
      <td>{listItem.createdAt}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.updatedAt}</td>
      <td>{listItem.endDate}</td>
      <td>
        {employee.employee.name} {employee.employee.last_name}
      </td>
      <td>
        <FaTimes className="crossLogo" onClick={() => crossChangeModalState(!crossmodalState)} />
        <FaEdit className="editLogo" onClick={() => editChangeModalState(!editModalState)} />
      </td>
      <DeleteModal state={crossmodalState} changeState={crossChangeModalState} />
      <EditModal state={editModalState} changeState={editChangeModalState} />
    </tr>
  );
};

export default ListItem;
