
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { RegisteredTickets, ContractState } from '/imports/api/ethereumFunctions.js';

import Header from '../components/Header.jsx';
import App from '../App.jsx';
import Login from '../pages/login.jsx';
import Register from '../pages/register.jsx';
import NotFound from '../pages/notFound.jsx';

import {createContainer} from 'meteor/react-meteor-data';

class MainLayout extends React.Component {

  render() {
    if (! this.props.userLoaded) {
      return (
        <p></p>
      )
    } else {
      let props = this.props;
      return (
        <Router>
          <div>
            <Header currentUser={this.props.currentUser} />
              <Switch>
                <Route exact path = '/' render={(props) => (
                  <App {...props} />
                )} />
                <Route path = '/login' component={Login} />
                <Route path = '/register' component={Register} />
                <Route component={NotFound} />
              </Switch>
          </div>
        </Router>
      );
    }
  }
}

MainLayout.PropTypes = {
    raffleContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool
}

MainLayout.ContextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default createContainer(() => {
  const handle = Meteor.subscribe('other-user-data');
  const stateHandle = Meteor.subscribe('raffleContractState');
  const ticketHandle = Meteor.subscribe('raffleRegisteredTickets');
  return {
    currentUser: Meteor.user(),
    userLoaded: Meteor.user() && handle.ready() && stateHandle.ready() && ticketHandle.ready(),
    raffleRegisteredTickets: RegisteredTickets.find({}).fetch(),
    userLoaded:  handle.ready(),
    raffleContractState: ContractState.find({}).fetch(),
  }
}, MainLayout);
