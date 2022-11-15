import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR,
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
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        list: action.payload
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        list: []
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        children: 'Super Admin deleted successfully',
        modalTitle: 'Success'
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        modalTitle: 'Error'
      };
    case POST_SUPERADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case POST_SUPERADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list, action.payload],
        children: 'Super Admin created successfully',
        modalTitle: 'Success'
      };
    case POST_SUPERADMINS_ERROR:
      return {
        ...state,
        fetching: false,
        children: action.payload,
        list: [],
        modalTitle: 'Error'
      };
    case PUT_SUPERADMINS_PENDING:
      return {
        ...state,
        fetching: true
      };
    case PUT_SUPERADMINS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: [...state.list],
        children: 'Super Admin edited successfully',
        modalTitle: 'Success'
      };
    case PUT_SUPERADMINS_ERROR:
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
