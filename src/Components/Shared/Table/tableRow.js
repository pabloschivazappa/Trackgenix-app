import React from 'react';
import FunctionalButton from '../Buttons/FunctionalButton';
import RedirectButton from '../Buttons/RedirectButton';

const TableRow = ({ item, columns, deleteItem, edit }) => {
  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <td key={index}>
                <RedirectButton
                  path={`${edit}?id=${item._id}`}
                  icon={<i className="fa-solid fa-pen-to-square fa-lg"></i>}
                  buttonType="list__button"
                />
                <FunctionalButton
                  action={() => deleteItem(item._id)}
                  icon={<i className="fa-solid fa-xmark fa-lg"></i>}
                  buttonType="list__button"
                />
              </td>
            );
          }

          if (columnItem.heading === 'Employees') {
            return (
              <td key={index}>
                {item.employees.map((e) => {
                  return (
                    e.employee &&
                    e.employee.name + ' ' + e.employee.lastName + ' (' + e.role + ')\n'
                  );
                })}
              </td>
            );
          }

          if (columnItem.heading === 'Employee' || columnItem.heading === 'Project') {
            return <td key={index}>{item[columnItem.value]?.name}</td>;
          }

          if (columnItem.heading === 'Task') {
            return <td key={index}>{item.task?.description}</td>;
          }

          return <td key={index}>{item[columnItem.value]}</td>;
        })}
      </tr>
    </>
  );
};

export default TableRow;
