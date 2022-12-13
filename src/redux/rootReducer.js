import { combineReducers } from 'redux';

import adminsReducer from './admins/reducer';
import employeesReducer from './employees/reducer';
import projectsReducer from './projects/reducer';
import superAdminsReducer from './superAdmins/reducer';
import tasksReducer from './tasks/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admins: adminsReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timeSheets: timeSheetsReducer
});

export default rootReducer;
