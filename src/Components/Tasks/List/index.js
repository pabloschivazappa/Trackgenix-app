import React from 'react';
import styles from './list.module.css';

const List = ({ list, deleteTask }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="descprition">Description</th>
          </tr>
        </thead>
        <tbody>
          {list.map((task) => {
            return (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{task.description}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
