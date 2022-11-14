import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTasksPending,
  deleteTasksSuccess,
  deleteTasksError
} from './actions';

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getTasksSuccess(data.data));
      } else {
        dispatch(getTasksError(data.error.toString()));
      }
    } catch (error) {
      dispatch(getTasksError(error.toString()));
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    dispatch(deleteTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      });
      if (response.ok) {
        dispatch(deleteTasksSuccess(id));
      } else {
        dispatch(deleteTasksError());
      }
    } catch (error) {
      dispatch(deleteTasksError(error.toString()));
      console.log(error);
    }
  };
};

export default { getTasks, deleteTasks };
