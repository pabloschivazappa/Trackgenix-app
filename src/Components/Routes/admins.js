import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

const Admins = lazy(() => import('Components/Admins/index'));
const AdminForm = lazy(() => import('Components/Admins/Form'));

const routes = [
  {
    name: 'home',
    path: '/admins'
  }
];
const AdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Admins} />
        <Route exact path={`${url}/form`} component={AdminForm} />
        <Route path={`${url}/form?id=`} component={AdminForm} />
      </Switch>
    </Layout>
  );
};

export default AdminsRouter;
