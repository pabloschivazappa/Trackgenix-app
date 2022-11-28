import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

export const loginLoading = () => {
  return {
    type: LOGIN_LOADING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
    list: []
  };
};
