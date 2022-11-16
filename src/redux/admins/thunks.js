import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError,
  postAdminsPending,
  postAdminsSuccess,
  postAdminsError,
  putAdminsPending,
  putAdminsSuccess,
  putAdminsError
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

export const createAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(postAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postAdminsSuccess(data.data));
      } else {
        dispatch(postAdminsError(data.message));
      }
    } catch (error) {
      dispatch(postAdminsError(error.toString()));
    }
  };
};

export const editAdmin = (id, admin) => {
  return async (dispatch) => {
    dispatch(putAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putAdminsSuccess(data.data));
      } else {
        dispatch(putAdminsError(data.message));
      }
    } catch (error) {
      dispatch(putAdminsError(error.toString()));
    }
  };
};
