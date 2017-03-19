
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { LedgerRegisteredTickets, LedgerContractState } from '/imports/api/ledgerRaffle.js';
import { TshirtRegisteredTickets, TshirtContractState } from '/imports/api/tshirtRaffle.js';
import { BitcoinBookRegisteredTickets, BitcoinBookContractState } from '/imports/api/bitcoinBookRaffle.js';

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
        <p>There is a problem</p>
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
    tshirtContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool
}

MainLayout.ContextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default createContainer(() => {
    const handle = Meteor.subscribe('other-user-data');
    const ticketHandle = Meteor.subscribe('ledgerRegisteredTickets');
    const stateHandle = Meteor.subscribe('ledgerContractState');
    const tshirtHandle = Meteor.subscribe('tshirtContractState');
    const tshirtTicketHandle = Meteor.subscribe('tshirtRegisteredTickets');
    const bitcoinBookHandle = Meteor.subscribe('bitcoinBookContractState');
    const bitcoinBookTicketHandle = Meteor.subscribe('bitcoinBookRegisteredTickets');
    
    return {
        currentUser: Meteor.user(),
        // ledgerRegisteredTickets: LedgerRegisteredTickets.find({}).fetch(),
        // tshirtRegisteredTickets: TshirtRegisteredTickets.find({}).fetch(),
        // bitcoinBookRegisteredTickets: BitcoinBookRegisteredTickets.find({}).fetch(),

        userLoaded:  handle.ready() && 
            stateHandle.ready() && ticketHandle.ready() && 
            tshirtHandle.ready() && tshirtTicketHandle.ready()  &&
            bitcoinBookHandle.ready() && bitcoinBookTicketHandle.ready(),
        ledgerContractState: LedgerContractState.find({}).fetch(),
        tshirtContractState: TshirtContractState.find({}).fetch(),
        bitcoinBookContractState: BitcoinBookContractState.find({}).fetch(),
    };
}, MainLayout);
