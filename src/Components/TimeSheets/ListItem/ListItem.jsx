import React from 'react';
import FunctionalButton from '../../Shared/Buttons/FunctionalButton';
import RedirectButton from '../../Shared/Buttons/RedirectButton';

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
        <div>
          <FunctionalButton
            action={() => handleDelete(item._id)}
            icon={<i className="fa-solid fa-xmark"></i>}
            buttonType="list__button"
          />
          <RedirectButton
            path={`/time-sheets/form?id=${item._id}`}
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            buttonType="list__button"
          />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
