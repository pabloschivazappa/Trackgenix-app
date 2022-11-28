import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

const INITIAL_STATE = {
  fetching: true,
  autheticated: false,
  role: null,
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
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        autheticated: true,
        role: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
