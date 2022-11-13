import { GET_EMPLOYEES_ERROR, GET_EMPLOYEES_LOADING, GET_EMPLOYEES_SUCCESS } from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Employees! ${action.payload}` },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default employeesReducer;
