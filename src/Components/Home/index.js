import styles from 'Components/Home/home.module.css';
import Rocket from '../../assets/Rocket.png';
import Company from '../../assets/company.png';
import Amilcar from '../../assets/Amilcar.jpg';
import Eial from '../../assets/Eial.jpg';
import Juan from '../../assets/Juan.png';
import Julian from '../../assets/Julian.jpg';
import Julieta from '../../assets/Julieta.png';
import Lean from '../../assets/Lean.jpg';
import Martin from '../../assets/Martin.png';
import Pablo from '../../assets/Pablo.jpg';
import Tomas from '../../assets/Tomas.jpg';

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
      <section>
        <div className={styles.company__container}>
          <div className={styles.company__img}>
            <img src={Company} alt="Company" />
          </div>
          <div className={styles.company__content}>
            <div>
              <h2 className={styles.company__gradient_text}>Company</h2>
            </div>
            <div className={styles.company__content_feature}>
              <div />
              <h3>Gigatech Software Solutions SA building</h3>
              <p>
                Trackgenix is a HR software company that streamlines human resource management for
                clients in more than 1,200 cities around the world.
              </p>
            </div>
            <div className={styles.company__content_feature}>
              <div />
              <h3>An inclusive workplace for everyone</h3>
              <p>
                Get to know our team and our offices and join us in our leap towards better human
                resources management. Learn how companies from all sectors already manage talent in
                a more efficient and humane way with our human resources software.
              </p>
            </div>
            <div className={styles.company__content_feature}>
              <div />
              <h3>Our workplace, our world</h3>
              <p>
                Trackgenix was created remotely in 2008 by Yves Hiernaux and Mic Cvilic after many
                years of working with hard-to-manage and even harder-to-understand reports and
                timesheets. Although we have grown, we continue with the same goal of offering a
                flexible, reliable and easy-to-use time control tool.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.about_us__container}>
          <div className={styles.about_us__content}>
            <h3>About Us</h3>
            <p>
              RadiumRocket developed TrackGenix as a software solution for optimal time-tracking and
              project management as a request for one of its most trusted clients, GigaTech Software
              Solutions, in late 2021, and swiftly became one of the most requested services in all
              of the million-dollar South American productivity industry. RadiumRocket are a group
              of passionate people fond of the latest cutting edge technologies in software
              development. They position ourselves at your side through all the process of
              development being responsible and co-workers with you to successfully get your product
              moving.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.our_team}>
        <div>
          <h2 className={styles.our_team__gradient_text}>Our Team</h2>
        </div>
        <div>
          <div className={styles.boxes__three_boxes}>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Amilcar} alt="Amilcar" />
              </div>
              <div className={styles.box__content}>
                <h2>Amilcar Hernandez</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Juan} alt="Juan" />
              </div>
              <div className={styles.box__content}>
                <h2>Juan Andrés Cappuccio</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Julian} alt="Julian" />
              </div>
              <div className={styles.box__content}>
                <h2>Julian Conti</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
          </div>
          <div className={styles.boxes__three_boxes}>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Martin} alt="Martin" />
              </div>
              <div className={styles.box__content}>
                <h2>Martin Gabriel Riolfo</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Pablo} alt="Pablo" />
              </div>
              <div className={styles.box__content}>
                <h2>Pablo Schivazappa</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Tomas} alt="Tomas" />
              </div>
              <div className={styles.box__content}>
                <h2>Tomas Bettini</h2>
                <p>DEVELOPER</p>
              </div>
            </div>
          </div>
          <div className={styles.boxes__three_boxes}>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Eial} alt="Eial" />
              </div>
              <div className={styles.box__content}>
                <h2>Eial Yafe</h2>
                <p>QA</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Julieta} alt="Julieta" />
              </div>
              <div className={styles.box__content}>
                <h2>Julieta Lara Balcaza</h2>
                <p>QA</p>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box__img}>
                <img src={Lean} alt="Leandro" />
              </div>
              <div className={styles.box__content}>
                <h2>Leandro Di Simone</h2>
                <p>QA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
