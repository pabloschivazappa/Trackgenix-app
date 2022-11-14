import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getAdminsSuccess(data.data));
      } else {
        dispatch(getAdminsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteAdminsSuccess(id));
      } else {
        dispatch(deleteAdminsError());
      }
    } catch (error) {
      dispatch(deleteAdminsError(error.toString()));
    }
  };
};
