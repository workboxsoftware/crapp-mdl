import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import About from '../components/About/About';
import App from '../components/App/App';
import Home from '../components/Home/Home';
import Timesheet from '../timesheets/timesheetEntryContainer'; 

const routes = (props) => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="timesheet" component={Timesheet} />
      </Route>
    </Router>
  );
}

export default routes;
