import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { LedgerRegisteredTickets, LedgerContractState } from '/imports/api/ledgerRaffle.js';
import { TshirtRegisteredTickets, TshirtContractState } from '/imports/api/tshirtRaffle.js';

import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper.jsx';
import RaffleStats from '/imports/ui/components/RaffleStats';
import AllocateTickets from '/imports/ui/components/AllocateTickets';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributePrizes from '/imports/ui/components/DistributePrizes';
import PrizeWon from '/imports/ui/components/PrizeWon';
import TshirtPrizeContainer from '/imports/ui/containers/TshirtPrizeContainer';
import UserInfo from '/imports/ui/components/UserInfo';
import NotLoggedIn from '/imports/ui/pages/notLoggedIn';


// App component - represents the whole Appe
class App extends Component {
    constructor(props) {
        super(props)
    }

    checkAuth(props) {
        if (props.userLoaded && !props.currentUser) {
            // uncomment if you want to automatically push to register page if not logged in
            // this.props.history.push('/register');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userLoaded !== this.props.userLoaded) {
            this.checkAuth(nextProps);
        }
    }

    render() {
        if (this.props.userLoaded) {
            // console.log(this.props)
            return (
                <div className='container'>
                    <RaffleStats 
                        currentUser={this.props.currentUser}
                        ledgerContractState={this.props.ledgerContractState} 
                        ledgerRegisteredTickets={this.props.ledgerRegisteredTickets}
                        tshirtContractState={this.props.tshirtContractState}
                        tshirtRegisteredTickets={this.props.tshirtRegisteredTickets}
                    />
                    <div className="divider" />
                    <UserInfo 
                        currentUser={this.props.currentUser} 
                        userLoaded={this.props.userLoaded}
                        ledgerRegisteredTickets={this.props.ledgerRegisteredTickets}
                        ledgerContractState={this.props.ledgerContractState}
                    />
                    <div className="divider" />
                    {this.props.currentUser.isRegistered ? null :
                    <AllocateTickets 
                        numTicketsToRegister={this.props.raffleTicketsToRegister}
                        currentUser={this.props.currentUser}
                    />
                    }
                    {this.props.ledgerContractState[0].currentStage == "Disbursed" ? 
                        this.props.ledgerRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                    }
                    <TshirtPrizeContainer {...this.props} />
                    <div className="divider" />
                    <RegisterForTickets currentUser={this.props.currentUser} ledgerContractState={this.props.ledgerContractState}/>
                    <div className="divider" />
                    {this.props.currentUser.username === 'cpetty' ?
                        <DistributePrizes currentUser={this.props.currentUser} ledgerContractState={this.props.ledgerContractState} /> :
                        null
                    }
                </div>
            );
        } else {
            return (
                <NotLoggedIn />
            )
        }
    }
}

App.PropTypes = {
    ledgerContractState: PropTypes.object.isRequired,
    tshirtContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool,
    ledgerRegisteredTickets: PropTypes.object,
};

App.ContextTypes = {
    router: PropTypes.object.isRequired,
}


export default createContainer(() => {
    const handle = Meteor.subscribe('other-user-data');
    const ticketHandle = Meteor.subscribe('ledgerRegisteredTickets');
    const stateHandle = Meteor.subscribe('ledgerContractState');
    const tshirtHandle = Meteor.subscribe('tshirtContractState');
    const tshirtTicketHandle = Meteor.subscribe('tshirtRegisteredTickets');

    return {
        currentUser: Meteor.user(),
        ledgerRegisteredTickets: LedgerRegisteredTickets.find({}).fetch(),
        tshirtRegisteredTickets: TshirtRegisteredTickets.find({}).fetch(),

        userLoaded:  Meteor.user() && handle.ready() && 
            stateHandle.ready() && ticketHandle.ready() && 
            tshirtHandle.ready() && tshirtTicketHandle.ready(),
        ledgerContractState: LedgerContractState.find({}).fetch(),
        tshirtContractState: TshirtContractState.find({}).fetch(),
    };
}, App);

