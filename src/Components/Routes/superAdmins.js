import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
const SuperAdmins = lazy(() => import('Components/SuperAdmins/index'));

const SuperAdminsEmployees = lazy(() => import('Components/SuperAdmins/Employees'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));
const SuperAdminsProfile = lazy(() => import('Components/SuperAdmins/Profile'));

const routes = [
  {
    name: 'home',
    path: '/superAdmins'
  }
];

const superAdmin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={SuperAdmins} />
        <Route path={`${url}/employees`} component={SuperAdminsEmployees} />
        <Route path={`${url}/employees?id=`} component={SuperAdminsEmployees} />
        <Route path={`${url}/profile`} component={SuperAdminsProfile} />
        <Route path={`${url}/form`} component={SuperAdminsForm} />
        <Route path={`${url}/form?id=`} component={SuperAdminsForm} />
      </Switch>
    </Layout>
  );
};

export default superAdmin;
