import React from 'react';
import styles from './list.module.css';

const List = ({ list, deleteTask }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Actions</th>
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
                    <button className={styles.table__button}>
                      <i className="fa-solid fa-pen-to-square fa-lg"></i>
                    </button>
                  </a>
                  <button className={styles.table__button} onClick={() => deleteTask(task._id)}>
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href="tasks/form">
        <button className={styles.add__button}>
          <p>Add Task</p>
          <i className="fa-solid fa-plus fa-lg"></i>
        </button>
      </a>
    </>
  );
};

export default List;
