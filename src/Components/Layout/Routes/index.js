import { tokenListener } from 'helpers/firebase';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const Admins = React.lazy(() => import('Components/Admins/index'));
const FormAdmins = React.lazy(() => import('Components/Admins/FormAdmins'));
const SuperAdmins = React.lazy(() => import('Components/SuperAdmins/index'));
const SuperAdminsForm = React.lazy(() => import('Components/SuperAdmins/Form'));
const Home = React.lazy(() => import('Components/Home/index'));
const Login = React.lazy(() => import('Components/Auth/Login'));
const SignUp = React.lazy(() => import('Components/Auth/SignUp'));
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
  useEffect(() => {
    console.log('Checkeo de token listener');
    tokenListener();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <PrivateRoute exact path="/admins" component={Admins} />
      <PrivateRoute path="/admins/form" component={FormAdmins} />
      <PrivateRoute path="/admins/form?id=" component={FormAdmins} />
      <PrivateRoute exact path="/employees" component={Employees} />
      <PrivateRoute path="/employees/form" component={EmployeesForm} />
      <PrivateRoute path="/employees/form?id=" component={EmployeesForm} />
      <PrivateRoute path="/employees/profile" component={EmployeesProfile} />
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute path="/projects/form" component={ProjectsForm} />
      <PrivateRoute path="/projects/form?id=" component={ProjectsForm} />
      <PrivateRoute exact path="/super-admins" component={SuperAdmins} />
      <PrivateRoute path="/super-admins/form" component={SuperAdminsForm} />
      <PrivateRoute path="/super-admins/form?id=" component={SuperAdminsForm} />
      <PrivateRoute exact path="/tasks" component={Tasks} />
      <PrivateRoute path="/tasks/form" component={TasksForm} />
      <PrivateRoute path="/tasks/form?id=" component={TasksForm} />
      <PrivateRoute exact path="/time-sheets" component={TimeSheets} />
      <PrivateRoute path="/time-sheets/form" component={TimesheetsForm} />
      <PrivateRoute path="/time-sheets/form?id=" component={TimesheetsForm} />
      <PrivateRoute path="/employees/projects" component={ProjectTable} />
    </Switch>
  );
};

export default Routes;
