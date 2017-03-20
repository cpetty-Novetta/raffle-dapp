import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { LedgerRegisteredTickets, LedgerContractState } from '/imports/api/ledgerRaffle.js';
import { TshirtRegisteredTickets, TshirtContractState } from '/imports/api/tshirtRaffle.js';
import { BitcoinBookContractState, BitcoinBookRegisteredTickets } from '/imports/api/bitcoinBookRaffle.js';
import { GraphBookContractState, GraphBookRegisteredTickets } from '/imports/api/graphBookRaffle.js';
import { DappBookContractState, DappBookRegisteredTickets } from '/imports/api/dappBookRaffle.js';
import { InternetBookContractState, InternetBookRegisteredTickets } from '/imports/api/internetBookRaffle.js';
import { MakersBookContractState, MakersBookRegisteredTickets } from '/imports/api/makersBookRaffle.js';

import MiningTransaction from '/imports/ui/components/MiningTransaction';
import RaffleStats from '/imports/ui/components/RaffleStats';
import AllocateTickets from '/imports/ui/components/AllocateTickets';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributePrizes from '/imports/ui/components/DistributePrizes';
import PrizeWon from '/imports/ui/components/PrizeWon';
import TshirtPrizeContainer from '/imports/ui/containers/TshirtPrizeContainer';
import DappBookPrizeContainer from '/imports/ui/containers/DappBookPrizeContainer';
import BitcoinBookPrizeContainer from'/imports/ui/containers/BitcoinBookPrizeContainer';
import GraphBookPrizeContainer from '/imports/ui/containers/GraphBookPrizeContainer';
import InternetBookPrizeContainer from '/imports/ui/containers/InternetBookPrizeContainer';
import MakersBookPrizeContainer from '/imports/ui/containers/MakersBookPrizeContainer';
import LedgerPrizeContainer from '/imports/ui/containers/LedgerPrizeContainer';
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

    componentDidMount() {
        $('.collapsible').collapsible({
            accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            onOpen: function(el) { alert('Open'); }, // Callback for Collapsible open
            onClose: function(el) { alert('Closed'); } // Callback for Collapsible close
        });
        $('.modal').modal();
    }

    render() {
        // {this.props.currentUser.isMining ?
        //                 <MiningTransaction /> : null
        //             }
        if (this.props.userLoaded) {
            return (
                <div className='container'>
                    <div className="section">
                        <ul className="collapsible popout" data-collapsible="accordion">
                            <li>
                                {this.props.ledgerContractState[0].currentStage === "Registration" ?
                                <div className="active collapsible-header">
                                    <h4 className="center">Your Registered Information</h4>
                                </div> :
                                <div className="collapsible-header">
                                    <h4 className="center">Your Registered Information</h4>
                                </div>
                                }
                                <div className="collapsible-body">
                                    <UserInfo 
                                        currentUser={this.props.currentUser} 
                                        userLoaded={this.props.userLoaded}
                                        ledgerRegisteredTickets={this.props.ledgerRegisteredTickets}
                                        ledgerContractState={this.props.ledgerContractState}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">
                                    <h4 className="center">Ticket Allocation</h4>
                                </div>
                                <div className="collapsible-body">
                                    {this.props.currentUser.isRegistered ? 
                                        <div className="row center">
                                            <p className="flow-text">You've allocated your tickets, now grab a drink, enjoy the talks, and wait to win!</p>
                                        </div> :
                                        <AllocateTickets 
                                            numTicketsToRegister={this.props.raffleTicketsToRegister}
                                            currentUser={this.props.currentUser}
                                        />
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">
                                    <h4 className="center">Raffle Prize Statistics</h4>
                                </div>
                                <div className="collapsible-body">
                                    <RaffleStats 
                                        {...this.props}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header">
                                    <h4 className="center">Winning Tickets!</h4>
                                </div>
                                <div className="collapsible-body center">
                                    <p className="flow-text">If you've won, please pick up your prizes at the prize desk'</p>
                                    <LedgerPrizeContainer {...this.props} />
                                    <TshirtPrizeContainer {...this.props} />
                                    <DappBookPrizeContainer {...this.props} />
                                    <BitcoinBookPrizeContainer {...this.props} />
                                    <GraphBookPrizeContainer {...this.props} />
                                    <InternetBookPrizeContainer {...this.props} />
                                    <MakersBookPrizeContainer {...this.props} />
                                </div>
                            </li>
                        </ul>
                    </div>
                    {this.props.currentUser.username === 'cpetty' ?
                        <div>
                            <div className="divider" />
                            <DistributePrizes {...this.props} />
                        </div> :
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
    const bitcoinBookHandle = Meteor.subscribe('bitcoinBookContractState');
    const graphBookHandle = Meteor.subscribe('graphBookContractState');
    const dappBookHandle = Meteor.subscribe('dappBookContractState');
    const internetBookHandle = Meteor.subscribe('internetBookContractState');
    const makersBookHandle = Meteor.subscribe('makersBookContractState');
    const bitcoinBookTicketHandle = Meteor.subscribe('bitcoinBookRegisteredTickets');
    const graphBookTicketHandle = Meteor.subscribe('graphBookRegisteredTickets');
    const dappBookTicketHandle = Meteor.subscribe('dappBookRegisteredTickets');
    const internetBookTicketHandle = Meteor.subscribe('internetBookRegisteredTickets');
    const makersBookTicketHandle = Meteor.subscribe('makersBookRegisteredTickets');

    return {
        currentUser: Meteor.user(),
        ledgerRegisteredTickets: LedgerRegisteredTickets.find({}).fetch(),
        tshirtRegisteredTickets: TshirtRegisteredTickets.find({}).fetch(),
        bitcoinBookRegisteredTickets: BitcoinBookRegisteredTickets.find({}).fetch(),
        graphBookRegisteredTickets: GraphBookRegisteredTickets.find({}).fetch(),
        dappBookRegisteredTickets: DappBookRegisteredTickets.find({}).fetch(),
        internetBookRegisteredTickets: InternetBookRegisteredTickets.find({}).fetch(),
        makersBookRegisteredTickets: MakersBookRegisteredTickets.find({}).fetch(),

        userLoaded:  Meteor.user() && handle.ready() && 
            stateHandle.ready() && ticketHandle.ready() && 
            tshirtHandle.ready() && tshirtTicketHandle.ready() &&
            bitcoinBookHandle.ready() && bitcoinBookTicketHandle.ready() &&
            graphBookHandle.ready() && graphBookTicketHandle.ready() &&
            dappBookHandle.ready() && dappBookTicketHandle.ready() &&
            internetBookHandle.ready() && internetBookTicketHandle.ready() &&
            makersBookHandle.ready() && makersBookTicketHandle.ready(),
        ledgerContractState: LedgerContractState.find({}).fetch(),
        tshirtContractState: TshirtContractState.find({}).fetch(),
        bitcoinBookContractState: BitcoinBookContractState.find({}).fetch(),
        graphBookContractState: GraphBookContractState.find({}).fetch(),
        dappBookContractState: DappBookContractState.find({}).fetch(),
        internetBookContractState: InternetBookContractState.find({}).fetch(),
        makersBookContractState: MakersBookContractState.find({}).fetch(),
    };
}, App);

