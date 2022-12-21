import styles from 'Components/Header/header.module.css';
import TrackgenixLogo from '../../assets/TrackGENIX-logo.png';
import { RedirectButton } from 'Components/Shared';
import store from 'redux/store';
import { useSelector } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import { Link } from 'react-router-dom';

function Header() {
  const { authenticated, fetching, data } = useSelector((state) => state.auth);
  const quit = async () => {
    store.dispatch(logout());
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <Link to="/home">
            <img
              src={TrackgenixLogo}
              alt="TrackGENIX Logo"
              className={styles.trackgenix_logo}
            ></img>
          </Link>
        </div>
        {authenticated && (
          <ul className={styles.routes}>
            {data === 'SUPER_ADMIN' && (
              <li>
                <Link to="/super-admins">super admins</Link>
              </li>
            )}
            {(data === 'SUPER_ADMIN' || data === 'ADMIN') && (
              <>
                <li>
                  <Link to="/admins">admins</Link>
                </li>
                <li>
                  <Link to="/employees">employees</Link>
                </li>
                <li>
                  <Link to="/projects">projects</Link>
                </li>
                <li>
                  <Link to="/time-sheets">timesheets</Link>
                </li>
                <li>
                  <Link to="/tasks">tasks</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/employees/profile">My Profile</Link>
            </li>
            {data === 'EMPLOYEE' && (
              <>
                <li>
                  <Link to="/employees/projects">My Projects</Link>
                </li>
                <li>
                  <Link to="/my-timesheets">My Timesheets</Link>
                </li>
              </>
            )}
          </ul>
        )}

        {!fetching && (
          <div className={styles.sign}>
            {authenticated ? (
              <>
                <div className={styles.logout}>
                  <RedirectButton path="/" title="Logout" action={() => quit()} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.login}>
                  <RedirectButton path="login" title="Login" />
                </div>
                <RedirectButton path="sign-up" title="Sign up" buttonColor="signup__button" />
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
