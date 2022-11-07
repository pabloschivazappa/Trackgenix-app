import React from 'react';
import styles from './ShowList.module.css';
import ListItem from '../ListItem/ListItem';
import TableButton from '../../Shared/Buttons/TableButton';

const ShowList = ({ list, deleteTimesheet }) => {
  return (
    <>
      {list.length !== 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Task description</th>
              <th>Employees names</th>
              <th>Project name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((timesheet) => {
              return (
                <ListItem
                  key={timesheet._id}
                  item={timesheet}
                  deleteTimesheet={deleteTimesheet}
                  className={styles.container}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.empty__list}>Empty list</p>
      )}
      <TableButton path={'/time-sheets/form'} />
    </>
  );
};

export default ShowList;
