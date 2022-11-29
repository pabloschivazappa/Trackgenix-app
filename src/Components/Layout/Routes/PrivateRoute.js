import { Spinner } from 'Components/Shared';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((store) => {
    return store.auth;
  });
  console.log(auth);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (auth.fetching) {
          return <Spinner />;
        }

        console.log(rest.role.includes(auth.data));

        if (rest.role.includes(auth.data)) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/home'} />;
      }}
    />
  );
};

export default PrivateRoute;
