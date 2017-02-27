import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { keystore, txutils } from 'eth-lightwallet';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // userAddress: '0xcc2cef4512d12679ba2e21bf1aed183ea4f2785a',
            userAddress: '',  // Current MetaMask account
            userCompany: '',
            userReason: '',
            currentStage: '',
            userTokens: 0,
            userTickets: 0,
        };

        this.getUserInfo.bind(this);
        this.getEthAddress.bind(this);
    }

    getUserInfo() {
        var userAddress = this.props.currentUser.account;
        console.log("Entering getUserInfo(), this: ", this);
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getUserInfo(userAddress, {from: userAddress});
        }).then((result) => {
            this.setState({
                userTickets: result[0].toNumber(),
                userTokens: result[1].toNumber(),
            })
            console.log(result[0].toNumber());
            console.log(result[1]);
        });
    }

    getEthAddress() {
        const seed = this.props.currentUser && this.props.currentUser._id;
        console.log(this.props.currentUser);
        console.log(! this.props.currentUser.account);
        if ( this.props.currentUser && !this.props.currentUser.account) {
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
                    if (Session.get('userAddress') === '') {
                        Session.set('userAddress', addr)
                    }
                    Meteor.call('admin.fundAddress', seed, addr);
                    console.log("keyFromPassword this: ", this);
                });
            });
            
                console.log(Session.get('userAddress'));
            
        }
    }
    
    componentDidMount() {
        const refreshStats = () => {
            this.getUserInfo();
        }

        refreshStats();

        setInterval(() => {
            refreshStats();
            return refreshStats
        }, 5000)
    }

    render() {
            
        return (
            
            <container className="container">
                <hr />
                <div className="user-info-div">
                    <h2>Registered Tickets: {this.state.userTickets}</h2>
                    <h2>Tokens Won: {this.state.userTokens}</h2>
                </div>
                <div className="registered-div">
                    <h2>Currently Registered Information:</h2>
                    {this.props.currentUser.account ?  
                        <p>Ethereum Address: {this.props.currentUser.account}</p> :
                        <button onClick={this.getEthAddress.bind(this)}>Get Ethereum Address</button>
                    }  
                    <p>Username: {this.props.currentUser.username}</p>
                    <p>Email: {this.props.currentUser.emails[0].address}</p>
                    {this.props.currentUser.company ?
                        <p>Company: {this.props.currentUser.company}</p> : 
                        <p className="unregistered">Company unregistered</p>
                    }
                    {this.props.currentUser.company ?
                        <p>Reason here: {this.props.currentUser.reason}</p> : 
                        <p className="unregistered">Reason unregistered</p>
                    }
                </div>
                <hr />
            </container>
        )
    }

}


