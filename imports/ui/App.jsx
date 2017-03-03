import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { RegisteredUsers } from '/imports/api/users.js';
import { RaffleContractState } from '/imports/api/ethereumFunctions.js';


import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper.jsx';
import RaffleStats from '/imports/ui/components/RaffleStats';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributeFunds from '/imports/ui/components/DistributeFunds';
import UserInfo from '/imports/ui/components/UserInfo';
var lightwallet = require('eth-lightwallet');

// App component - represents the whole Appe
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hideCompleted: false,
            registeredUser: false,
            userCreatedInRegister: false,
            totTicketsRegistered: 0,
            userTicketsRegistered: 0,
            userTokensWon: 0,
            totUsersRegistered: 0,
        };

        this.renderAdmin.bind(this);
        this.renderUser.bind(this);

        // this.createUserFile.bind(this);
    }

    refreshStats() {
        // Refresh all contract and user stats after something is called.
    }

    renderUser  ()  {
        const currentUserName = this.props.currentUser && this.props.currentUser.username;
        console.log("Not currentUser.acount: ",! this.props.currentUser.account);
        if (this.props.currentUser && ! this.state.userCreatedInRegister) {
            this.createUserFile();
            this.setState({
                userCreatedInRegister: true,
            })
        }

        var user_props = this.props.registeredUser.valueOf()

        return (
            <div className="userDiv">
                <UserInfo currentUser={this.props.currentUser}/>
                {this.props.registeredUser.registered ? '' :
                    <RegisterForTickets currentUser={this.props.currentUser}/>    
                }
            </div>
        )
    }

    createUserFile () {
        console.log("createUserFile this: ", this);
        var userId = this.props.currentUser._id;
        Meteor.call('user.insertUser', userId);
        this.setState({
            userCreatedInRegister: true,
        })
    }

    // getEthAddress() {
    //     // const seed = this.props.currentUser && this.props.currentUser._id;
    //     var seed = 'unhappy nerve cancel reject october fix vital pulse cash behind curious bicycle'
        

    renderAdmin() {
        const currentUserName = this.props.currentUser && this.props.currentUser.username;
        if (currentUserName === 'cpetty') {
            
            return (
                <div className="adminDiv">
                    <DistributeFunds />
                </div> 
            )
        }
    }

    onRaffleUpdate (data) {
        this.setState({

        })
    }

    componentDidMount() {
        const printState = () => {
            console.log(this.props.raffleContractState);
            
        }
        printState();
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Jailbreak Raffle Dapp</h1>

                    <AccountsUIWrapper />

                    <RaffleStats onUpdate={this.onRaffleUpdate}/>
                    {/*<button onClick={this.getEthAddress}>Click for getEthAddress</button>*/}

                    {/* this only shows if user is logged into an account */}
                    {this.props.currentUser ? this.renderUser() : ''}

                    {this.renderAdmin()}
                </header>
            </div>
        );
    }
}

App.PropTypes = {
    raffleContractState: PropTypes.object.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
    registeredUser: PropTypes.object.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('registeredUsers');
    Meteor.subscribe('other-user-data');
    Meteor.subscribe('raffleContractState');

    return {
        currentUser: Meteor.user(),
        registeredUser: RegisteredUsers.find({}).fetch(),
        raffleContractState: RaffleContractState.find({}).fetch(),
    };
}, App);