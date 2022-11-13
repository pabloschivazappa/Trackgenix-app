import { getEmployeesLoading, getEmployeesSuccess, getEmployeesError } from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      dispatch(getEmployeesSuccess(data.data));
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};
