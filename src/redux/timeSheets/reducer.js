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

const INITIAL_STATE = {
  list: [],
  fetching: false,
  error: '',
  children: '',
  modalTitle: ''
};

const timeSheetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_TIMESHEETS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        fetching: false,
        children: 'Timesheet deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_TIMESHEETS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case POST_TIMESHEETS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Timesheet created successfully',
        modalTitle: 'Success'
      };
    case POST_TIMESHEETS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_TIMESHEETS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case PUT_TIMESHEETS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list],
        children: 'Timesheet edited successfully',
        modalTitle: 'Success'
      };
    case PUT_TIMESHEETS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case SET_MODAL_TITLE:
      return {
        ...state,
        modalTitle: action.payload
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        children: action.payload
      };
    case SET_FETCHING_VALUE:
      return {
        ...state,
        fetching: action.payload
      };
    default:
      return state;
  }
};

export default timeSheetsReducer;
