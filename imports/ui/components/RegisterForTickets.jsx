import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { keystore, txutils } from 'eth-lightwallet';

export default class RegisterForTickets extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: '', 
            userCompany: '',
            userReason: '',
        };

        this.handleSubmit.bind(this);
        this.registerUser.bind(this);
        this.getEthAddress.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const CompanyText = ReactDOM.findDOMNode(this.refs.userCompany).value.trim();
        const ReasonText =  ReactDOM.findDOMNode(this.refs.userReason).value.trim();

        // For our Novetta Database reasons
        Meteor.call('user.insertCompany', this.props.currentUser._id, CompanyText);
        Meteor.call('user.insertReason', this.props.currentUser._id, ReasonText);
        Meteor.call('ticket.register', CompanyText, ReasonText);

        // To call smart contract
        user_props = {
            company: CompanyText,
            reason: ReasonText
        };
        if (! this.props.currentUser.addressRegistered) {
            console.log("getting new Ethereum Address");
            this.getEthAddress();
        }
        this.registerUser(user_props);

        // Clear form
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
    }

    getEthAddress() {
        const seed = this.props.currentUser && this.props.currentUser._id;

        keystore.createVault({
            password: seed,

        }, function(err, ks) {
            if (err) throw err;
            ks.keyFromPassword(seed, function(err, pwDerivedKey) {
                if (err) throw err;

                ks.generateNewAddress(pwDerivedKey, 1);
                var addresses = ks.getAddresses();
                var addr = '0x' + addresses[0].valueOf();
                console.log("seed: ", seed);
                console.log("address: ", addr);
                console.log("address valueOf: ", addr);
                Meteor.call('user.insertAddress',seed, addr);
                Meteor.call('admin.fundAddress', addr);
                
            });
        });
    }

    

    registerUser (user_props) {
        var userAddress = this.props.currentUser.address;
        console.log('registered address: ', userAddress);
        var username = this.props.currentUser.username;
        var email = this.props.currentUser.emails[0].address;
        var companyName = this.props.currentUser.companyRegistered;
        var reasonHere = this.props.currentUser.reasonRegistered;

        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.registerUser(userAddress, username, email, companyName, reasonHere, {from: coinbase, gas: 500000});
        }).then((result) => {
            console.log("logs: ", result.logs);
            console.log("receipt: ", result.receipt);
            console.log("tx Hash: ", result.tx);
            console.log(result);
        })
        // USE THESE IF YOU WANT RE-REGISTRATION
        // if (companyName.length > 0) {
        //     Meteor.call('user.setRegistered',this.props.currentUser._id, 'companyRegistered', true);
        // }
        // if (reasonHere.length > 0) {
        //     Meteor.call('user.setRegistered',this.props.currentUser._id, 'reasonRegistered', true);
        // }
        console.log(this.props.currentUser._id);
        Meteor.call('user.setRegistered',this.props.currentUser._id, 'registered', true);
    }

    componentWillMount() {
    }
 
    render() {
        
        return (
            <container className="register-container">
                <hr />
                <div className="registered-div">
                    <h2>Currently Registered Information:</h2>
                    <p>Username: {this.props.currentUser.username}</p>
                    <p>Email: {this.props.currentUser.emails[0].address}</p>
                </div>
                <div className="register-div" >
                    <h2>Enter more information for more tickets!</h2>
                    <form className="new-register" onSubmit={this.handleSubmit.bind(this)} >
                        <input 
                            type="text"
                            ref="userCompany"
                            placeholder="Your company"
                        />
                        <input 
                            type="text"
                            ref="userReason"
                            placeholder="How'd you hear about this?"
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
                <hr />
            </container>
        )
    }

}

RegisterForTickets.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
