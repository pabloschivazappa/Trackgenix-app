import {
  getEmployeesLoading,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesLoading,
  deleteEmployeesSuccess,
  deleteEmployeesError
} from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getEmployeesSuccess(data.data));
      } else {
        dispatch(getEmployeesError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      });
      if (response.ok) {
        dispatch(deleteEmployeesSuccess(id));
      } else {
        dispatch(deleteEmployeesError());
      }
    } catch (error) {
      dispatch(deleteEmployeesError(error.toString()));
    }
  };
};
