import { tokenListener } from 'helpers/firebase';
import React, { useEffect } from 'react';
import Spinner from 'Components/Shared/Spinner';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const Header = React.lazy(() => import('Components/Header/index'));
const Footer = React.lazy(() => import('Components/Footer/index'));
const Admins = React.lazy(() => import('Components/Admins/index'));
const SuperAdmins = React.lazy(() => import('Components/SuperAdmins/index'));
const Home = React.lazy(() => import('Components/Home/index'));
import styles from 'Components/Routes/layout.module.css';
const Employees = React.lazy(() => import('Components/Employees/index'));
const Projects = React.lazy(() => import('Components/Projects'));
const TimeSheets = React.lazy(() => import('Components/TimeSheets'));
const Tasks = React.lazy(() => import('Components/Tasks/index'));
const ProjectTable = React.lazy(() => import('Components/ProjectsTable'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

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
        <Switch>
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/admins" role="ADMIN" component={Admins} />
          <PrivateRoute exact path="/employees" role="EMPLOYEE" component={Employees} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/super-admins" role="SUPER-ADMIN" component={SuperAdmins} />
          <PrivateRoute exact path="/tasks" component={Tasks} />
          <PrivateRoute exact path="/time-sheets" component={TimeSheets} />
          <Redirect to="/auth" />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/employees/projects" component={ProjectTable} />
        </Switch>
        <Footer />
      </div>
    </React.Suspense>
  );
};

export default withRouter(Routes);
