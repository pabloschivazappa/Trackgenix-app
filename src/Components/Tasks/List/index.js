import React from 'react';
import styles from './list.module.css';

const List = ({ list }) => {
  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="descprition">Description</th>
          </tr>
        </thead>
        <tbody>
          {list.data.map((task) => {
            return (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{task.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
