import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import FormAdmins from '../Admins/FormAdmins';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdmins/Form';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import TimesheetsForm from '../TimeSheets/Form/TimesheetsForm';
import ProjectsForm from '../Projects/Form/index';
import TasksForm from '../Tasks/Form';

const Routes = () => {
  return (
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
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
