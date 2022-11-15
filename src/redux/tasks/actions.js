import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE,
  POST_TASKS_PENDING,
  POST_TASKS_SUCCESS,
  POST_TASKS_ERROR,
  PUT_TASKS_PENDING,
  PUT_TASKS_SUCCESS,
  PUT_TASKS_ERROR
} from './constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASKS_PENDING
  };
};

export const deleteTasksSuccess = (data) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload: data
  };
};

export const deleteTasksError = (error) => {
  return {
    type: DELETE_TASKS_ERROR,
    payload: error
  };
};

export const setModalTitle = (data) => {
  return {
    type: SET_MODAL_TITLE,
    payload: data
  };
};

export const setModalContent = (data) => {
  return {
    type: SET_MODAL_CONTENT,
    payload: data
  };
};

export const setFetching = (data) => {
  return {
    type: SET_FETCHING_VALUE,
    payload: data
  };
};

export const postTasksPending = () => {
  return {
    type: POST_TASKS_PENDING
  };
};

export const postTasksSuccess = (data) => {
  return {
    type: POST_TASKS_SUCCESS,
    payload: data
  };
};

export const postTasksError = (error) => {
  return {
    type: POST_TASKS_ERROR,
    payload: error
  };
};

export const putTasksPending = () => {
  return {
    type: PUT_TASKS_PENDING
  };
};

export const putTasksSuccess = (data) => {
  return {
    type: PUT_TASKS_SUCCESS,
    payload: data
  };
};

export const putTasksError = (error) => {
  return {
    type: PUT_TASKS_ERROR,
    payload: error
  };
};
