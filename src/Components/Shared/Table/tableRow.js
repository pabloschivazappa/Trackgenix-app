import React from 'react';
import FunctionalButton from 'Components/Shared/Buttons/FunctionalButton';
import RedirectButton from 'Components/Shared/Buttons/RedirectButton';
import styles from 'Components/Shared/Table/table.module.css';

const TableRow = ({
  item,
  columns,
  deleteItem,
  edit,
  employeeId,
  inProfile = false,
  setHours,
  isPM = false,
  inProjects
}) => {
  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <td className={styles.icons} key={index}>
                {inProfile && (
                  <FunctionalButton
                    action={() => setHours(item._id)}
                    icon={<i className="fa-regular fa-clock"></i>}
                    buttonType="list__button"
                  />
                )}

                {inProjects && (
                  <RedirectButton
                    path={`/time-sheets?id=${item._id}`}
                    icon={<i className="fa-regular fa-file fa-lg"></i>}
                    buttonType="list__button"
                  />
                )}

                {!inProfile || isPM ? (
                  <RedirectButton
                    path={`${edit}?id=${item._id}`}
                    icon={<i className="fa-solid fa-pen-to-square fa-lg"></i>}
                    buttonType="list__button"
                  />
                ) : (
                  <RedirectButton
                    path={'#'}
                    icon={
                      <i
                        className={`fa-solid fa-pen-to-square fa-lg ${styles.grey} ${styles.not__allowed}`}
                      ></i>
                    }
                    buttonType="list__button"
                  />
                )}

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

          if (columnItem.heading === 'Role') {
            return (
              <td key={index}>
                {item.employees.map((e) => {
                  return e.employee?._id === employeeId && e.employee && e.role;
                })}
              </td>
            );
          }

          if (columnItem.heading === 'Rate') {
            return (
              <td key={index}>
                {item.employees.map((e) => {
                  return e.employee?._id === employeeId && e.employee && e.rate;
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
