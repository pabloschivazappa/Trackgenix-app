import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getSuperAdminsSuccess(data.data));
      } else {
        dispatch(getSuperAdminsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getSuperAdminsError(error.toString()));
    }
  };
};

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteSuperAdminsSuccess(id));
      } else {
        dispatch(deleteSuperAdminsError());
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};

export const createSuperAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(postSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postSuperAdminsSuccess(data.data));
      } else {
        console.log(data);
        dispatch(postSuperAdminsError(data.message));
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error.toString()));
    }
  };
};

export const editSuperAdmin = (id, admin) => {
  return async (dispatch) => {
    dispatch(putSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putSuperAdminsSuccess(data.data));
      } else {
        console.log(data);
        dispatch(putSuperAdminsError(data.message));
      }
    } catch (error) {
      dispatch(putSuperAdminsError(error.toString()));
    }
  };
};
