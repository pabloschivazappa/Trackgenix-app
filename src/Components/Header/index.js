import styles from 'Components/Header/header.module.css';
import TrackgenixLogo from '../../assets/TrackGENIX-logo.png';
import { RedirectButton } from 'Components/Shared';
import store from 'redux/store';
import { useSelector } from 'react-redux';
import { logout } from 'redux/auth/thunks';
// const urlParams = new URLSearchParams(window.location.search);
// const employeeId = urlParams.get('id');
// const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
// const rowId = idRegEx.test(employeeId);

function Header() {
  const { authenticated, fetching, data } = useSelector((state) => state.auth);
  const quit = async () => {
    store.dispatch(logout());
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <a href="/home">
            <img
              src={TrackgenixLogo}
              alt="TrackGENIX Logo"
              className={styles.trackgenix_logo}
            ></img>
          </a>
        </div>
        {authenticated && (
          <ul className={styles.rutes}>
            {data === 'SUPER_ADMIN' && (
              <li>
                <a href="/super-admins">super admins</a>
              </li>
            )}
            {(data === 'SUPER_ADMIN' || data === 'ADMIN') && (
              <li>
                <a href="/admins">admins</a>
              </li>
            )}
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
            <li>
              <a href="/employees/profile">My Profile</a>
            </li>
            {data === 'EMPLOYEES' ?? (
              <li>
                <a href="/employees/projects">My Projects</a>
              </li>
            )}
          </ul>
        )}

        {!fetching && (
          <div className={styles.sign}>
            {authenticated ? (
              <>
                <div>
                  <RedirectButton path="/" title="Logout" action={() => quit()} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.login}>
                  <RedirectButton path="login" title="Login" />
                </div>
                <button type="button" className={styles.signup__button}>
                  <RedirectButton path="sign-up" title="Sign up" />
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
