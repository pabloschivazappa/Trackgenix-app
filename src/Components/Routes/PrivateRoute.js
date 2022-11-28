import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setAuthentication } from '../redux/auth/actions';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const email = sessionStorage.getItem('email');
    if (token && role && email) {
      dispatch(
        setAuthentication({
          role,
          email
        })
      );
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('role') == rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
