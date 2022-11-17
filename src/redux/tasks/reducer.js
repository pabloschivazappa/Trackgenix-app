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

const INITIAL_STATE = {
  list: [],
  fetching: false,
  error: '',
  children: '',
  modalTitle: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        children: 'Task deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case SET_MODAL_TITLE:
      return {
        ...state,
        fetching: false,
        error: '',
        modalTitle: action.payload
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        fetching: false,
        error: '',
        children: action.payload
      };
    case SET_FETCHING_VALUE:
      return {
        ...state,
        fetching: action.payload
      };
    case POST_TASKS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case POST_TASKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Task created successfully',
        modalTitle: 'Success'
      };
    case POST_TASKS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case PUT_TASKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Task edited successfully',
        modalTitle: 'Success'
      };
    case PUT_TASKS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        error: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    default:
      return state;
  }
};

export default reducer;
