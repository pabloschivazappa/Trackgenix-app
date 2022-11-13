import { GET_EMPLOYEES_LOADING, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from './constants';

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
    payload: error
  };
};
