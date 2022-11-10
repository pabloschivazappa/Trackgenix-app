import React from 'react';
import TableRow from './tableRow.js';
import styles from './table.module.css';

const Table = ({ columns, data, deleteItem, edit }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tHead}>
        <tr>
          {columns.map((item, index) => {
            return <th key={index}>{item.heading}</th>;
          })}
        </tr>
      </thead>
      <tbody className={styles.tRow}>
        {data.map((item, index) => {
          return (
            <TableRow
              key={index}
              item={item}
              columns={columns}
              deleteItem={deleteItem}
              edit={edit}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
