import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form/index'));

const routes = [
  {
    name: 'task',
    path: '/tasks'
  }
];

const TasksRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Tasks} />
        <Route exact path={`${url}/form`} component={TasksForm} />
        <Route path={`${url}/form?id=`} component={TasksForm} />
      </Switch>
    </Layout>
  );
};

export default TasksRouter;
