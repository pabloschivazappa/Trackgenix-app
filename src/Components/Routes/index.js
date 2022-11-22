import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import Admins from 'Components/Admins/index';
import FormAdmins from 'Components/Admins/FormAdmins';
import SuperAdmins from 'Components/SuperAdmins/index';
import SuperAdminsForm from 'Components/SuperAdmins/Form';
import Home from 'Components/Home/index';
import styles from 'Components/Routes/layout.module.css';
import Employees from 'Components/Employees/index';
import EmployeesForm from 'Components/Employees/Form';
import Projects from 'Components/Projects';
import TimeSheets from 'Components/TimeSheets';
import Tasks from 'Components/Tasks/index';
import TimesheetsForm from 'Components/TimeSheets/Form/TimesheetsForm';
import ProjectsForm from 'Components/Projects/Form/index';
import TasksForm from 'Components/Tasks/Form';
import ProjectTable from 'Components/ProjectsTable';

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
          <Redirect to="/home?id=637556a4d6689c383fac4a66" />
        </Route>
        {/* <Route path="/employees/my-profile" component={ProjectTable} /> */}
        <Route path="/employees/projects" component={ProjectTable} />
      </Switch>
      <Footer />
    </div>
  );
};

export default withRouter(Routes);
