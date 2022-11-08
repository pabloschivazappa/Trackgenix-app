import React from 'react';
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';

const Form = ({ onSubmitFunction, children }) => {
  let history = useHistory();
  console.log(history);

  return (
    <form onSubmit={onSubmitFunction} className={styles.form}>
      {children}
      <button onClick={() => history.goBack()}>Cancel</button>
    </form>
  );
};

export default Form;
