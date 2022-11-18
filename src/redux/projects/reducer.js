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

const INITIAL_STATE = {
  list: [],
  fetching: false,
  error: '',
  children: '',
  modalTitle: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        children: 'Project deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case POST_PROJECTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Project created successfully',
        modalTitle: 'Success'
      };
    case POST_PROJECTS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_PROJECTS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case PUT_PROJECTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list],
        children: 'Project edited successfully',
        modalTitle: 'Success'
      };
    case PUT_PROJECTS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
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

export default reducer;
