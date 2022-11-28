import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';

const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));

const routes = [
  {
    name: 'timeSheets',
    path: '/time-sheets'
  }
];

const TimeSheetsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={TimeSheets} />
        <Route exact path={`${url}/form`} component={TimeSheetsForm} />
        <Route path={`${url}/form?id=`} component={TimeSheetsForm} />
      </Switch>
    </Layout>
  );
};

export default TimeSheetsRouter;
