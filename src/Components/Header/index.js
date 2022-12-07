import styles from 'Components/Header/header.module.css';
import TrackgenixLogo from '../../assets/TrackGENIX-logo.png';
import { RedirectButton } from 'Components/Shared';

const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('id');
const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const rowId = idRegEx.test(employeeId);

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <a href="/">
            <img
              src={TrackgenixLogo}
              alt="TrackGENIX Logo"
              className={styles.trackgenix_logo}
            ></img>
          </a>
        </div>
        <ul className={styles.rutes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/super-admins">super admins</a>
          </li>
          <li>
            <a href="/employees">employees</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/time-sheets">timesheets</a>
          </li>
          <li>
            <a href="/tasks">tasks</a>
          </li>
        </ul>
        <div className={styles.sign}>
          {rowId ? (
            <>
              <p>
                <a href="employees/profile?id=637556a4d6689c383fac4a66">My Profile</a>
              </p>
              <p>
                <a href="employees/projects?id=637556a4d6689c383fac4a66">Projects</a>
              </p>
            </>
          ) : (
            <>
              <p>
                <RedirectButton path="login" title="Login" />
              </p>
              <button type="button">
                <RedirectButton path="sign-up" title="Sign up" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
