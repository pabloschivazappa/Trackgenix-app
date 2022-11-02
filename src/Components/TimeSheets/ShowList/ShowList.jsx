import React from 'react';
import styles from './ShowList.css';
import ListItem from '../ListItem/ListItem';

const ShowList = ({ list, deleteTimesheet }) => {
  return (
    <div className={styles.container}>
      <table>
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
    </div>
  );
};

export default ShowList;
