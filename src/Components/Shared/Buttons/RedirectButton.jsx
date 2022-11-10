import { Link } from 'react-router-dom';
import styles from './buttons.module.css';

const RedirectButton = ({ path, title = null, icon = null, buttonType }) => {
  return (
    <Link to={path} className={styles[buttonType]}>
      {title}
      {icon}
    </Link>
  );
};

export default RedirectButton;
