import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_LOADING,
  GET_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_LOADING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT
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
    default:
      return state;
  }
};

export default employeesReducer;
