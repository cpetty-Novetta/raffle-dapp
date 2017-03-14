import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { RegisteredTickets, ContractState } from '/imports/api/ethereumFunctions.js';

import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper.jsx';
import RaffleStats from '/imports/ui/components/RaffleStats';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributePrizes from '/imports/ui/components/DistributePrizes';
import PrizeWon from '/imports/ui/components/PrizeWon';
import UserInfo from '/imports/ui/components/UserInfo';
import NotLoggedIn from '/imports/ui/pages/notLoggedIn';


// App component - represents the whole Appe
class App extends Component {
    constructor(props) {
        super(props)
    }

    checkAuth(props) {
        if (props.userLoaded && !props.currentUser) {
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
            return (
                <div className='container'>
                    <RaffleStats contractState={this.props.raffleContractState}/>
                    <div className="divider" />
                    <UserInfo 
                        currentUser={this.props.currentUser} 
                        userLoaded={this.props.userLoaded}
                        raffleRegisteredTickets={this.props.raffleRegisteredTickets}
                    />
                    <div className="divider" />
                    {this.props.raffleContractState[0].currentStage == "Disbursed" ? 
                        this.props.raffleRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                    }
                    <div className="divider" />
                    <RegisterForTickets currentUser={this.props.currentUser} contractState={this.props.raffleContractState}/>
                    <div className="divider" />
                    {this.props.currentUser.username === 'cpetty' ?
                        <DistributePrizes currentUser={this.props.currentUser} contractState={this.props.raffleContractState} /> :
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
    raffleContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool,
    raffleRegisteredTickets: PropTypes.object,
};

App.ContextTypes = {
    router: PropTypes.object.isRequired,
}


export default createContainer(() => {
    const handle = Meteor.subscribe('other-user-data');
    const ticketHandle = Meteor.subscribe('raffleRegisteredTickets');
    const stateHandle = Meteor.subscribe('raffleContractState');

    return {
        currentUser: Meteor.user(),
        raffleRegisteredTickets: RegisteredTickets.find({}).fetch(),
        userLoaded:  Meteor.user() && handle.ready() && stateHandle.ready() && ticketHandle.ready(),
        raffleContractState: ContractState.find({}).fetch(),
    };
}, App);

