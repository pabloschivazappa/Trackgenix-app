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

const token = sessionStorage.getItem('token');

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        headers: { token }
      });
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
        method: 'DELETE',
        headers: { token }
      });
      if (response.ok) {
        dispatch(deleteAdminsSuccess());
      } else {
        dispatch(deleteAdminsError());
      }
    } catch (error) {
      dispatch(deleteAdminsError(error.toString()));
    }
    dispatch(getAdmins());
  };
};

export const createAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(postAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
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

export const editAdmin = (id, admin, isForDelete = false) => {
  return async (dispatch) => {
    dispatch(putAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ ...admin, active: true })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putAdminsSuccess(data.data));
        isForDelete === true && dispatch(deleteAdminsSuccess());
      } else {
        dispatch(putAdminsError(data.message));
      }
    } catch (error) {
      dispatch(putAdminsError(error.toString()));
    }
    dispatch(getAdmins());
  };
};
