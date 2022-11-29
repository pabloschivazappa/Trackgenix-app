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
      <PrivateRoute role={['ADMIN', 'SUPER_ADMIN']} exact path="/admins" component={Admins} />
      <PrivateRoute role={['ADMIN', 'SUPER_ADMIN']} path="/admins/form" component={FormAdmins} />
      <PrivateRoute
        role={['ADMIN', 'SUPER_ADMIN']}
        path="/admins/form?id="
        component={FormAdmins}
      />
      <PrivateRoute
        exact
        path="/employees"
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        component={Employees}
      />
      <PrivateRoute
        role={['ADMIN', 'SUPER_ADMIN']}
        path="/employees/form"
        component={EmployeesForm}
      />
      <PrivateRoute
        role={['ADMIN', 'SUPER_ADMIN']}
        path="/employees/form?id="
        component={EmployeesForm}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        path="/employees/profile"
        component={EmployeesProfile}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        exact
        path="/projects"
        component={Projects}
      />
      <PrivateRoute
        role={['ADMIN', 'SUPER_ADMIN']}
        path="/projects/form"
        component={ProjectsForm}
      />
      <PrivateRoute
        role={['ADMIN', 'SUPER_ADMIN']}
        path="/projects/form?id="
        component={ProjectsForm}
      />
      <PrivateRoute role={['SUPER_ADMIN']} exact path="/super-admins" component={SuperAdmins} />
      <PrivateRoute role={['SUPER_ADMIN']} path="/super-admins/form" component={SuperAdminsForm} />
      <PrivateRoute
        role={['SUPER_ADMIN']}
        path="/super-admins/form?id="
        component={SuperAdminsForm}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        exact
        path="/tasks"
        component={Tasks}
      />
      <PrivateRoute role={['ADMIN', 'SUPER_ADMIN']} path="/tasks/form" component={TasksForm} />
      <PrivateRoute role={['ADMIN', 'SUPER_ADMIN']} path="/tasks/form?id=" component={TasksForm} />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        exact
        path="/time-sheets"
        component={TimeSheets}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        path="/time-sheets/form"
        component={TimesheetsForm}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        path="/time-sheets/form?id="
        component={TimesheetsForm}
      />
      <PrivateRoute
        role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
        path="/employees/projects"
        component={ProjectTable}
      />
    </Switch>
  );
};

export default Routes;
