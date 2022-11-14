import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  SET_MODAL_TITLE,
  SET_MODAL_CONTENT
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
        list: [...state.list.filter((tasks) => tasks._id !== action.payload)],
        children: 'Task deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
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
    default:
      return state;
  }
};

export default reducer;
