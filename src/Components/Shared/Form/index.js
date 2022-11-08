import React from 'react';
import styles from './form.module.css';
import { useHistory } from 'react-router-dom';

const Form = ({ onSubmitFunction, children }) => {
  let history = useHistory();
  const back = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <form onSubmit={onSubmitFunction} className={styles.form}>
      {children}
      <button onClick={back}>Cancel</button>
    </form>
  );
};

export default Form;
