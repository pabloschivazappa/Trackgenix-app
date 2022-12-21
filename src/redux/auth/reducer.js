import {
  LOGIN_LOADING,
  LOGIN_ERROR,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  SET_ID_VALUE,
  SET_ERROR_VALUE
} from './constants';

const INITIAL_STATE = {
  fetching: true,
  authenticated: false,
  data: null,
  id: null,
  error: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        fetching: false,
        authenticated: true,
        data: action.payload,
        error: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        fetching: false,
        data: null,
        authenticated: false
      };
    case SET_ID_VALUE:
      return {
        ...state,
        id: action.payload
      };
    case SET_ERROR_VALUE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
