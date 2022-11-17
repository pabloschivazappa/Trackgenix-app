import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_ERROR,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT
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