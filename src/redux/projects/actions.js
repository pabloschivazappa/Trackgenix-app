import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  POST_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
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

export const getProjectsSuccess = (payload) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const deleteProjectsPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectsSuccess = (payload) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload
  };
};

export const deleteProjectsError = (error) => {
  return {
    type: DELETE_PROJECTS_ERROR,
    payload: error ? error : 'Error'
  };
};

export const postProjectsPending = () => {
  return {
    type: POST_PROJECTS_PENDING
  };
};

export const postProjectsSuccess = (payload) => {
  return {
    type: POST_PROJECTS_SUCCESS,
    payload
  };
};

export const postProjectsError = (payload) => {
  return {
    type: POST_PROJECTS_ERROR,
    payload
  };
};

export const putProjectsPending = () => {
  return {
    type: PUT_PROJECTS_PENDING
  };
};

export const putProjectsSuccess = (payload) => {
  return {
    type: PUT_PROJECTS_SUCCESS,
    payload
  };
};

export const putProjectsError = (payload) => {
  return {
    type: PUT_PROJECTS_ERROR,
    payload
  };
};

export const setFetching = (payload) => {
  return {
    type: SET_FETCHING_VALUE,
    payload
  };
};
