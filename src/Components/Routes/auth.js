import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from '../Layout';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

const routes = [
  {
    name: 'Login',
    path: '/auth/login'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up'
  }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
