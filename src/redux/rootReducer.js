import { combineReducers } from 'redux';

import adminsReducer from './admins/reducer';
import employeesReducer from './employees/reducer';
import projectsReducer from './projects/reducer';
import superAdminsReducer from './superAdmins/reducer';
import tasksReducer from './tasks/reducer';
import timeSheetsReducer from './timeSheets/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timeSheets: timeSheetsReducer
});

export default rootReducer;
