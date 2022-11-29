import {
  getEmployeesLoading,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesLoading,
  deleteEmployeesSuccess,
  deleteEmployeesError,
  postEmployeesLoading,
  postEmployeesSuccess,
  postEmployeesError,
  putEmployeesLoading,
  putEmployeesSuccess,
  putEmployeesError
} from './actions';

const token = sessionStorage.getItem('token');

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        headers: { token }
      });
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
        headers: { 'Content-type': 'application/json', token }
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

export const createEmployee = (employee) => {
  return async (dispatch) => {
    dispatch(postEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postEmployeesSuccess(data.data));
      } else {
        dispatch(postEmployeesError(data.message));
      }
    } catch (error) {
      dispatch(postEmployeesError(error.toString()));
    }
  };
};

export const editEmployee = (id, employee) => {
  return async (dispatch) => {
    dispatch(putEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(employee)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putEmployeesSuccess(data.data));
      } else {
        dispatch(putEmployeesError(data.message));
      }
    } catch (error) {
      dispatch(putEmployeesError(error.toString()));
    }
  };
};
