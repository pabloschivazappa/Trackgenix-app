import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: DELETE_ADMINS_ERROR,
    payload: error
  };
};
