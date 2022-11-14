import {
  GET_EMPLOYEES_LOADING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_LOADING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
} from './constants';

export const getEmployeesLoading = () => {
  return {
    type: GET_EMPLOYEES_LOADING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error,
    list: []
  };
};

export const deleteEmployeesLoading = () => {
  return {
    type: DELETE_EMPLOYEES_LOADING
  };
};

export const deleteEmployeesSuccess = (payload) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error ? error : 'Error'
  };
};
