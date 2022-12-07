import styles from 'Components/Home/home.module.css';
import Rocket from '../../assets/Rocket.png';

function Home() {
  return (
    <>
      <section>
        <div className={styles.main__container}>
          <div className={styles.main__content}>
            <h1 className={styles.gradient__text}>Welcome to TrackGENIX</h1>
            <p>
              TRACKGENIX is a revolutionary system designed fot Gigatech Software Solutions SA. This
              System sill allow them to efficiently manage thir proyects, schedule flow, selected
              work teams and much more.
            </p>
          </div>
          <div className={styles.main__rocket}>
            <img src={Rocket} alt="Rocket"></img>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.whyshoulduse__container}>
          <div>
            <h2 className={styles.whyshoulduse__gradient_text}>Why you should use Trackgenix?</h2>
          </div>
          <div className={styles.whyshoulduse__content}>
            <div className={styles.whyshoulduse__content_feature}>
              <div />
              <h3>Productivity Booster</h3>
              <p>
                Be more productive using better Focus, Time Management, Organization and Efficiency.
              </p>
            </div>
            <div className={styles.whyshoulduse__content_feature}>
              <div />
              <h3>Leadership and team managemant</h3>
              <p>
                Lead a group of people in accomplishing a task or common goal. Effective team
                management involves supporting, communicating with and uplifting team members so
                they perform to the best of their abilities and continue to grow as professionals.
              </p>
            </div>
            <div className={styles.whyshoulduse__content_feature}>
              <div />
              <h3>Decision making</h3>
              <p>Make better decisions for your business</p>
            </div>
            <div className={styles.whyshoulduse__content_feature}>
              <div />
              <h3>Work traceability</h3>
              <p>Keep track of specs, changes, requests, results, and versions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
