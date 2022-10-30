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
                  <a href={`tasks/form?id=${task._id}`}>
                    <button>Edit</button>
                  </a>
                  <button onClick={() => deleteTask(task._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href="tasks/form">
        <button>Add</button>
      </a>
    </div>
  );
};

export default List;
