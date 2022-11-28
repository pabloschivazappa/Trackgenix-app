import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

const Projects = lazy(() => import('Components/Projects/index'));
const ProjectsForm = lazy(() => import('Components/Projects/Form/index'));

const routes = [
  {
    name: 'projects',
    path: '/projects'
  }
];
const ProjectsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Projects} />
        <Route exact path={`${url}/form`} component={ProjectsForm} />
        <Route path={`${url}/form?id=`} component={ProjectsForm} />
      </Switch>
    </Layout>
  );
};

export default ProjectsRouter;
