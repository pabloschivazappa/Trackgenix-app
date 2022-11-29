import styles from 'Components/Home/home.module.css';
import { RedirectButton } from 'Components/Shared';

const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('id');
const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
const rowId = idRegEx.test(employeeId);

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      {rowId ? (
        <>
          <h3>
            <a href="employees/profile?id=637556a4d6689c383fac4a66">My Profile</a>
          </h3>
          <h3>
            <a href="employees/projects?id=637556a4d6689c383fac4a66">Projects</a>
          </h3>
        </>
      ) : (
        <>
          <h3>
            <RedirectButton path="login" title="Login" />
          </h3>
          <h3>
            <RedirectButton path="sign-up" title="Sign up" />
          </h3>
        </>
      )}
    </section>
  );
}

export default Home;
