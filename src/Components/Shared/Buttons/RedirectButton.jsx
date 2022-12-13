import { Link } from 'react-router-dom';
import styles from 'Components/Shared/Buttons/buttons.module.css';

const RedirectButton = ({
  path,
  title = null,
  icon = null,
  action = null,
  buttonType,
  buttonColor
}) => {
  return (
    <Link to={path} className={`${styles[buttonType]} ${styles[buttonColor]}`} onClick={action}>
      <div>{title}</div>
      {icon}
    </Link>
  );
};

export default RedirectButton;
