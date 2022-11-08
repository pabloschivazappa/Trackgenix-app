import { Link } from 'react-router-dom';
import styles from './buttons.module.css';

const RedirectButton = ({ path, title = null, icon = null }) => {
  return (
    <Link to={path}>
      <button className={styles.add__button}>
        <p>{title}</p>
        {icon}
      </button>
    </Link>
  );
};

export default RedirectButton;
