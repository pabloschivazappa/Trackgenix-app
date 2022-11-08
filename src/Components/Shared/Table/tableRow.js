import React from 'react';
//import Modal from '../Modal';
//import { useState } from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({ item, columns, deleteItem, edit }) => {
  //const [setModal, setModalDisplay] = useState(false);

  return (
    <>
      <tr>
        {columns.map((columnItem, index) => {
          if (columnItem.heading === 'Actions') {
            return (
              <>
                <td>
                  <button>
                    <Link to={`${edit}?id=${item._id}`}>
                      <i className="fa-solid fa-pen-to-square fa-lg"></i>
                    </Link>
                  </button>
                  <button onClick={deleteItem}>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </button>
                </td>
              </>
            );
          }

          return <td key={index}>{item[columnItem.value]}</td>;
        })}
      </tr>
    </>
  );
};

export default TableRow;
