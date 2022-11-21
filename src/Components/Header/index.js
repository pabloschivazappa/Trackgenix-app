import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-facebook-f fa-lg"></i>
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-twitter fa-lg"></i>
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          <a
            href="/home?id=637556a4d6689c383fac4a66"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Track<span>GENIX</span>
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
      </nav>
    </header>
  );
}

export default Header;
