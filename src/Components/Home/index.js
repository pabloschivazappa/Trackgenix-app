import styles from 'Components/Home/home.module.css';
import Rocket from '../../assets/Rocket.png';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.main__content}>
        <h1 className={styles.gradient__text}>Welcome to TrackGENIX</h1>
        <p>
          TRACKGENIX is a revolutionary system designed fot Gigatech Software Solutions SA. This
          System sill allow them to efficiently manage thir proyects, schedule flow, selected work
          teams and much more.
        </p>
      </div>
      <div className={styles.main__rocket}>
        <img src={Rocket} alt="Rocket"></img>
      </div>
    </section>
  );
}

export default Home;
