import { FaTimes, FaEdit } from 'react-icons/fa';
import './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const employee = listItem.employees.find((employee) => employee);

  const handleDelete = (id) => {
    deleteItem(id);
  };

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
        <FaTimes className="crossLogo" onClick={() => handleDelete(listItem._id)} />
        <FaEdit className="editLogo" />
      </td>
    </tr>
  );
};

export default ListItem;
