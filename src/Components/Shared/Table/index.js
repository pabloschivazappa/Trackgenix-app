import React from 'react';
import TableRow from './tableRow.js';
import styles from './table.module.css';
import RedirectButton from '../Buttons/RedirectButton.jsx';

const Table = ({ title, columns, data, deleteItem, edit }) => {
  return (
    <>
      <h2 className={styles.entity}>{title}</h2>
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
      <RedirectButton
        title="Create "
        icon={<i className="fa-solid fa-plus"></i>}
        path={`${edit}`}
        buttonType="create__button"
      />
    </>
  );
};

export default Table;
