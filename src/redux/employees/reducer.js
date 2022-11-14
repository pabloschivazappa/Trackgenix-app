import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_LOADING,
  GET_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_LOADING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
} from './constants';

const INITIAL_STATE = {
  fetching: false,
  list: [],
  error: '',
  children: 'Are you sure?'
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
        list: state.list.filter((employee) => employee._id !== action.payload),
        children: 'Employee deleted'
      };
    case DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
