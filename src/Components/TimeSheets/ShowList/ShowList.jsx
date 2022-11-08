import React from 'react';
import styles from './ShowList.module.css';
import ListItem from '../ListItem/ListItem';
import RedirectButton from '../../Shared/Buttons/RedirectButton';

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
      <RedirectButton
        path={'/time-sheets/form'}
        title="Create "
        icon={<i className="fa-solid fa-plus"></i>}
      />
    </>
  );
};

export default ShowList;
