import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import About from '../components/About/About';
import App from '../components/App/App';
import Home from '../components/Home/Home';
import Refi18n from '../refi18n/refi18nContainer';  
import RefDataEntry from '../refDataEntry/refDataEntryContainer';
import RefSignup from '../refAuth/refSignupContainer';



const routes = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="refi18n" component={Refi18n} />
        <Route path="refdataentry" component={RefDataEntry} />
        <Route path="refsignup" component={RefSignup} />
      </Route>
    </Router>
  );
};

export default routes;
