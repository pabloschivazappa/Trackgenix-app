import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (payload) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload
  };
};

export const getAdminsError = (payload) => {
  return {
    type: GET_ADMINS_ERROR,
    payload
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (payload) => {
  return {
    type: DELETE_ADMINS_SUCCESS,
    payload
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: DELETE_ADMINS_ERROR,
    payload: error ? error : 'Cannot delete admin'
  };
};

export const postAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const postAdminsSuccess = (payload) => {
  return {
    type: POST_ADMINS_SUCCESS,
    payload
  };
};

export const postAdminsError = (payload) => {
  return {
    type: POST_ADMINS_ERROR,
    payload
  };
};

export const putAdminsPending = () => {
  return {
    type: PUT_ADMINS_PENDING
  };
};

export const putAdminsSuccess = (payload) => {
  return {
    type: PUT_ADMINS_SUCCESS,
    payload
  };
};

export const putAdminsError = (payload) => {
  return {
    type: PUT_ADMINS_ERROR,
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
