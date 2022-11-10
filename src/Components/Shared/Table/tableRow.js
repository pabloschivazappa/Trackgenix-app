import React from 'react';
//import Modal from '../Modal';
//import { useState } from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({ item, columns, deleteItem, edit }) => {
  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <td key={index}>
                <button>
                  <Link to={`${edit}?id=${item._id}`}>
                    <i className="fa-solid fa-pen-to-square fa-lg"></i>
                  </Link>
                </button>
                <button onClick={() => deleteItem(item._id)}>
                  <i className="fa-solid fa-xmark fa-lg"></i>
                </button>
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
