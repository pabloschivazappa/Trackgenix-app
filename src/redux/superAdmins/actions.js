import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload
  };
};

export const getSuperAdminsError = (payload) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (payload) => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS,
    payload
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error ? error : 'Cannot delete superadmin'
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPERADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (payload) => {
  return {
    type: POST_SUPERADMINS_SUCCESS,
    payload
  };
};

export const postSuperAdminsError = (payload) => {
  return {
    type: POST_SUPERADMINS_ERROR,
    payload
  };
};

export const putSuperAdminsPending = () => {
  return {
    type: PUT_SUPERADMINS_PENDING
  };
};

export const putSuperAdminsSuccess = (payload) => {
  return {
    type: PUT_SUPERADMINS_SUCCESS,
    payload
  };
};

export const putSuperAdminsError = (payload) => {
  return {
    type: PUT_SUPERADMINS_ERROR,
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
