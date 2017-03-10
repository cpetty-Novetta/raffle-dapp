import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { RegisteredTickets } from '/imports/api/ethereumFunctions.js';

import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper.jsx';
import RaffleStats from '/imports/ui/components/RaffleStats';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributeFunds from '/imports/ui/components/DistributeFunds';
// import UserContainer from '/imports/ui/containers/UserContainer';
import UserInfo from '/imports/ui/components/UserInfo';


// App component - represents the whole Appe
class App extends Component {
    constructor(props) {
        super(props)
    }

    /*renderUser(props)  {
        console.log("renderUser props: ", props)
        const currentUserName = this.props.currentUser && this.props.currentUser.username;
        if (this.props.currentUser && ! this.state.userCreatedInRegister) {
            // this.createUserFile();
            this.setState({
                userCreatedInRegister: true,
            });
        }

        // var user_props = this.props.registeredUser.valueOf()

        return (
            <div className="userDiv">
                <UserInfo currentUser={this.props.currentUser}/>
                {this.props.currentUser.isRegistered ? '' :
                    <RegisterForTickets currentUser={this.props.currentUser}/>    
                }
            </div>
        )
    }*/

    createUserFile () {
        var userId = this.props.currentUser._id;
        Meteor.call('user.insertUser', userId);
    }

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

    checkAuth(props) {
        if (props.userLoaded && !props.currentUser) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userLoaded !== this.props.userLoaded) {
            this.checkAuth(nextProps);
        }
    }

    render() {
        if (Meteor.userId() !== null) {
        return (
            <div className='container'>
                <header>
                    <RaffleStats />

                    <UserInfo currentUser={this.props.currentUser} userLoaded={this.props.userLoaded}/>
                    <RegisterForTickets currentUser={this.props.currentUser} />

                    {/*{this.renderAdmin()}*/}
                </header>
            </div>
        );
        } else {
            return (
                <div className="container">
                    <header>
                        <RaffleStats />
                        <p className="flow-text">Please Log In or Register</p>
                    </header>
                </div>)
        }
    }
}

App.PropTypes = {
    raffleContractState: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    userLoaded: PropTypes.bool
};

App.ContextTypes = {
    router: PropTypes.object.isRequired,
}


export default createContainer(() => {
    const handle = Meteor.subscribe('other-user-data');
    Meteor.subscribe('raffleRegisteredTickets');

    return {
        currentUser: Meteor.user(),
        raffleRegisteredTickets: RegisteredTickets.find({}).fetch(),
        userLoaded:  handle.ready(),
    };
}, App);

