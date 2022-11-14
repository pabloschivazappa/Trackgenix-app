import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsPending,
  deleteTimesheetsSuccess,
  deleteTimesheetsError,
  postTimesheetsPending,
  postTimesheetsSuccess,
  postTimesheetsError,
  putTimesheetsPending,
  putTimesheetsSuccess,
  putTimesheetsError
} from './actions';

export const getTimesheets = () => {
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getTimesheetsSuccess(data.data));
      } else {
        dispatch(getTimesheetsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getTimesheetsError(error.toString()));
    }
  };
};

export const deleteTimesheet = (id) => {
  return async (dispatch) => {
    dispatch(deleteTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteTimesheetsSuccess(id));
      } else {
        dispatch(deleteTimesheetsError());
      }
    } catch (error) {
      dispatch(deleteTimesheetsError(error.toString()));
    }
  };
};

export const createTimesheet = (timesheet) => {
  return async (dispatch) => {
    dispatch(postTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheet)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postTimesheetsSuccess(data.data));
      } else {
        console.log(data);
        dispatch(postTimesheetsError(data.message));
      }
    } catch (error) {
      dispatch(postTimesheetsError(error.toString()));
    }
  };
};

export const editTimesheet = (id, timesheet) => {
  return async (dispatch) => {
    dispatch(putTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timesheet)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putTimesheetsSuccess(data.data));
      } else {
        console.log(data);
        dispatch(putTimesheetsError(data.message));
      }
    } catch (error) {
      dispatch(putTimesheetsError(error.toString()));
    }
  };
};
