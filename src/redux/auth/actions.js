import {
  LOGIN_LOADING,
  LOGIN_ERROR,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  LOGOUT_LOADING,
  LOGOUT_ERROR
} from './constants';

export const loginLoading = () => {
  return {
    type: LOGIN_LOADING
  };
};

export const setLoggedIn = (data) => {
  return {
    type: SET_LOGGED_IN,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const setLoggedOut = () => {
  return {
    type: SET_LOGGED_OUT,
    payload: null
  };
};

export const logoutLoading = () => {
  return {
    type: LOGOUT_LOADING
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};
