import { LOGIN_LOADING, LOGIN_ERROR, SET_LOGGED_IN, SET_LOGGED_OUT } from './constants';

const INITIAL_STATE = {
  fetching: true,
  autheticated: false,
  data: null,
  email: null,
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
        autheticated: true,
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
        data: null
      };
    default:
      return state;
  }
};

export default authReducer;
