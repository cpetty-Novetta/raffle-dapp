import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { RegisteredUsers } from '/imports/api/users.js';
import { RaffleContractState } from '/imports/api/ethereumFunctions.js';

import Header from '../components/Header.jsx';
import App from '../App.jsx';
import Login from '../pages/login.jsx';
import Register from '../pages/register.jsx';
import NotFound from '../pages/notFound.jsx';

import {createContainer} from 'meteor/react-meteor-data';

class MainLayout extends React.Component {

  render() {
    if (! this.props.userLoaded ) {
      return (
        <p></p>
      )
    }
    return (
      <Router>
        <div>
          <Header currentUser={this.props.currentUser} />
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

export default createContainer(() => {
  const handle = Meteor.subscribe('other-user-data');
  return {
    currentUser: Meteor.user(),
    userLoaded: handle.ready(),
  }
},MainLayout);
