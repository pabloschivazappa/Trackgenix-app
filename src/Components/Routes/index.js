import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
const Header = React.lazy(() => import('Components/Header/index'));
const Footer = React.lazy(() => import('Components/Footer/index'));
const Admins = React.lazy(() => import('Components/Admins/index'));
const FormAdmins = React.lazy(() => import('Components/Admins/FormAdmins'));
const SuperAdmins = React.lazy(() => import('Components/SuperAdmins/index'));
const SuperAdminsForm = React.lazy(() => import('Components/SuperAdmins/Form'));
const Home = React.lazy(() => import('Components/Home/index'));
import styles from 'Components/Routes/layout.module.css';
const Employees = React.lazy(() => import('Components/Employees/index'));
const EmployeesForm = React.lazy(() => import('Components/Employees/Form'));
const Projects = React.lazy(() => import('Components/Projects'));
const TimeSheets = React.lazy(() => import('Components/TimeSheets'));
const Tasks = React.lazy(() => import('Components/Tasks/index'));
const TimesheetsForm = React.lazy(() => import('Components/TimeSheets/Form/TimesheetsForm'));
const ProjectsForm = React.lazy(() => import('Components/Projects/Form/index'));
const TasksForm = React.lazy(() => import('Components/Tasks/Form'));
const ProjectTable = React.lazy(() => import('Components/ProjectsTable'));
const EmployeesProfile = React.lazy(() => import('Components/Employees/Profile'));

const Routes = () => {
  return (
    <React.Suspense fallback={''}>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/form" component={FormAdmins} />
          <Route path="/admins/form?id=" component={FormAdmins} />
          <Route exact path="/employees" component={Employees} />
          <Route path="/employees/form" component={EmployeesForm} />
          <Route path="/employees/form?id=" component={EmployeesForm} />
          <Route path="/employees/profile" component={EmployeesProfile} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/form" component={ProjectsForm} />
          <Route path="/projects/form?id=" component={ProjectsForm} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route path="/super-admins/form" component={SuperAdminsForm} />
          <Route path="/super-admins/form?id=" component={SuperAdminsForm} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/form" component={TasksForm} />
          <Route path="/tasks/form?id=" component={TasksForm} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route path="/time-sheets/form" component={TimesheetsForm} />
          <Route path="/time-sheets/form?id=" component={TimesheetsForm} />
          <Route exact path="/">
            <Redirect to="/home?id=637556a4d6689c383fac4a66" />
          </Route>
          <Route path="/employees/projects" component={ProjectTable} />
        </Switch>
        <Footer />
      </div>
    </React.Suspense>
  );
};

export default withRouter(Routes);
