import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsSuccess,
  deleteProjectsError,
  postProjectsPending,
  postProjectsSuccess,
  postProjectsError,
  putProjectsPending,
  putProjectsSuccess,
  putProjectsError
} from './actions';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getProjectsSuccess(data.data));
      } else {
        dispatch(getProjectsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteProjectsSuccess(id));
      } else {
        dispatch(deleteProjectsError());
      }
    } catch (error) {
      dispatch(deleteProjectsError(error.toString()));
    }
  };
};

export const createProject = ({
  name,
  description,
  clientName,
  startDate,
  employees,
  endDate,
  active
}) => {
  return async (dispatch) => {
    dispatch(postProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          clientName,
          startDate,
          employees,
          endDate,
          active
        })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postProjectsSuccess(data.data));
      } else {
        dispatch(postProjectsError(data.message));
      }
    } catch (error) {
      dispatch(postProjectsError(error.toString()));
    }
  };
};

export const editProject = (
  id,
  { name, description, clientName, startDate, employees, endDate, active }
) => {
  return async (dispatch) => {
    dispatch(putProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          clientName,
          startDate,
          employees,
          endDate,
          active
        })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putProjectsSuccess(data.data));
      } else {
        dispatch(putProjectsError(data.message));
      }
    } catch (error) {
      dispatch(putProjectsError(error.toString()));
    }
  };
};
