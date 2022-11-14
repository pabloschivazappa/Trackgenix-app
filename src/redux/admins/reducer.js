import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
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
    case GET_ADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list.filter((admin) => admin._id !== action.payload)],
        children: 'Admin deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_ADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case POST_ADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case POST_ADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Admin created successfully',
        modalTitle: 'Success'
      };
    case POST_ADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case PUT_ADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list],
        children: 'Admin edited successfully',
        modalTitle: 'Success'
      };
    case PUT_ADMINS_ERROR:
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

export default reducer;
