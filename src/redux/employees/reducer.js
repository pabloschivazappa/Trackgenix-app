import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_LOADING,
  GET_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_LOADING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  POST_EMPLOYEES_LOADING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_LOADING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT,
  SET_FETCHING_VALUE
} from './constants';

const INITIAL_STATE = {
  fetching: false,
  list: [],
  error: '',
  children: '',
  modalTitle: ''
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_LOADING:
      return {
        ...state,
        fetching: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_EMPLOYEES_LOADING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        fetching: false,
        children: 'Employee deleted succesfully',
        modalTitle: 'Succes'
      };
    case DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case POST_EMPLOYEES_LOADING:
      return {
        ...state,
        fetching: true
      };
    case POST_EMPLOYEES_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Employee created successfully',
        modalTitle: 'Success'
      };
    case POST_EMPLOYEES_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_EMPLOYEES_LOADING:
      return {
        ...state,
        fetching: true
      };
    case PUT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Employee edited successfully',
        modalTitle: 'Success'
      };
    case PUT_EMPLOYEES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: [],
        children: action.payload,
        modalTitle: 'Error'
      };
    case SET_MODAL_TITLE:
      return {
        ...state,
        fetching: false,
        modalTitle: action.payload
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        fetching: false,
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

export default employeesReducer;
