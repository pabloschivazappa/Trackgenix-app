import { LOGIN_LOADING, LOGIN_ERROR, SET_LOGGED_IN, SET_LOGGED_OUT } from './constants';

const INITIAL_STATE = {
  fetching: true,
  authenticated: false,
  data: null,
  id: null,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        fetching: true
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        fetching: false,
        authenticated: true,
        data: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        fetching: false,
        data: null,
        authenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
