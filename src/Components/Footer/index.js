import styles from 'Components/Footer/footer.module.css';
import RRlogo from '../../assets/RR-logo.png';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.license}>
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Radium Rocket <img src={RRlogo} alt="RRlogo"></img>
        </div>
        <div className={styles.social_networks}>
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
    </footer>
  );
}

export default Footer;
