import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Header from '../components/Header.jsx';
import App from '../App.jsx';
import Login from '../pages/login.jsx';
import Register from '../pages/register.jsx';
import NotFound from '../pages/notFound.jsx';

export default class MainLayout extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
            <Switch>
              <Route exact path = '/' component={App} />
              <Route path = '/dashboard' component={App} />
              <Route path = '/login' component={Login} />
              <Route path = '/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
  }
}

MainLayout.ContextTypes = {
    router: React.PropTypes.object.isRequired,
}
