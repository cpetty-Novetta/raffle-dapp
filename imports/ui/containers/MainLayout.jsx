
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { LedgerRegisteredTickets, LedgerContractState } from '/imports/api/ledgerRaffle.js';
import { TshirtRegisteredTickets, TshirtContractState } from '/imports/api/tshirtRaffle.js';

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
    ledgerContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool
}

MainLayout.ContextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default createContainer(() => {
  const handle = Meteor.subscribe('other-user-data');
  const stateHandle = Meteor.subscribe('ledgerContractState');
  const ticketHandle = Meteor.subscribe('ledgerRegisteredTickets');
  const tshirtHandle = Meteor.subscribe('tshirtContractState');
  const tshirtTicketHandle = Meteor.subscribe('tshirtRegisteredTickets');
  return {
    currentUser: Meteor.user(),
    userLoaded:  Meteor.user() && handle.ready() && 
            stateHandle.ready() && ticketHandle.ready() && 
            tshirtHandle.ready() && tshirtTicketHandle.ready(),
    ledgerRegisteredTickets: LedgerRegisteredTickets.find({}).fetch(),
    tshirtRegisteredTickets: TshirtRegisteredTickets.find({}).fetch(),
    userLoaded:  handle.ready(),
    ledgerContractState: LedgerContractState.find({}).fetch(),
    tshirtContractState: TshirtContractState.find({}).fetch(),
  }
}, MainLayout);
