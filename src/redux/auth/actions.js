import {
  LOGIN_LOADING,
  LOGIN_ERROR,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  LOGOUT_LOADING,
  LOGOUT_ERROR,
  SET_ID_VALUE,
  SET_ID_NULL
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
    payload: null,
    id: null
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

export const setIdValue = (payload) => {
  return {
    type: SET_ID_VALUE,
    payload
  };
};

export const setIdNull = () => {
  return {
    type: SET_ID_NULL
  };
};
