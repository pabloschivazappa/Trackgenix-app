import styles from 'Components/Shared/Spinner/spinner.module.css';

function Spinner() {
  return (
    <div className={styles.center}>
      <div className={styles.ring}></div>
      <span>loading...</span>
    </div>
  );
}

export default Spinner;
