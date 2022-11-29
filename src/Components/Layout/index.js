import React from 'react';
import Spinner from 'Components/Shared/Spinner';
import { withRouter } from 'react-router-dom';
import Routes from 'Components/Layout/Routes';
const Header = React.lazy(() => import('Components/Header/index'));
const Footer = React.lazy(() => import('Components/Footer/index'));

import styles from 'Components/Layout/layout.module.css';

const Layout = () => {
  return (
    <React.Suspense
      fallback={
        <div className={styles.spinner__container}>
          <Spinner />
        </div>
      }
    >
      <div className={styles.container}>
        <Header />
        <Routes />
        <Footer />
      </div>
    </React.Suspense>
  );
};

export default withRouter(Layout);
