import {
  GET_EMPLOYEES_LOADING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_LOADING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  POST_EMPLOYEES_LOADING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_LOADING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
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
    payload: error ? error : 'Cannot delete employee'
  };
};

export const postEmployeesLoading = () => {
  return {
    type: POST_EMPLOYEES_LOADING
  };
};

export const postEmployeesSuccess = (payload) => {
  return {
    type: POST_EMPLOYEES_SUCCESS,
    payload
  };
};

export const postEmployeesError = (payload) => {
  return {
    type: POST_EMPLOYEES_ERROR,
    payload
  };
};

export const putEmployeesLoading = () => {
  return {
    type: PUT_EMPLOYEES_LOADING
  };
};

export const putEmployeesSuccess = (payload) => {
  return {
    type: PUT_EMPLOYEES_SUCCESS,
    payload
  };
};

export const putEmployeesError = (payload) => {
  return {
    type: PUT_EMPLOYEES_ERROR,
    payload
  };
};

export const setModalTitle = (payload) => {
  return {
    type: SET_MODAL_TITLE,
    payload
  };
};

export const setModalContent = (payload) => {
  return {
    type: SET_MODAL_CONTENT,
    payload
  };
};

export const setFetching = (payload) => {
  return {
    type: SET_FETCHING_VALUE,
    payload
  };
};
