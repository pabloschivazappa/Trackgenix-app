import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_SUCCESS,
  PUT_TIMESHEETS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload
  };
};

export const getTimesheetsError = (payload) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload
  };
};

export const deleteTimesheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const deleteTimesheetsSuccess = () => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS
  };
};

export const deleteTimesheetsError = (error) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
    payload: error ? error : 'Cannot delete timesheet'
  };
};

export const postTimesheetsPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const postTimesheetsSuccess = (payload) => {
  return {
    type: POST_TIMESHEETS_SUCCESS,
    payload
  };
};

export const postTimesheetsError = (payload) => {
  return {
    type: POST_TIMESHEETS_ERROR,
    payload
  };
};

export const putTimesheetsPending = () => {
  return {
    type: PUT_TIMESHEETS_PENDING
  };
};

export const putTimesheetsSuccess = (payload) => {
  return {
    type: PUT_TIMESHEETS_SUCCESS,
    payload
  };
};

export const putTimesheetsError = (payload) => {
  return {
    type: PUT_TIMESHEETS_ERROR,
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
