import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/login`} component={Login} />
      <Route path={`${url}/sign-up`} component={SignUp} />
      <Redirect to={`${url}/login`} />
    </Switch>
  );
};

export default AuthRoutes;
