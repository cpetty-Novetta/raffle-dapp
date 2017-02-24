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
        };

        this.getUserInfo.bind(this);
        this.getEthAddress.bind(this);
    }

    getUserInfo() {
        var userAddress = this.props.registeredUser.account;
        console.log(this.props.registeredUser);
        console.log(this)
        var deployed;
        this.getEthAddress();
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getUserInfo(userAddress, {from: coinbase});
        }).then((result) => {
            this.setState({
                userTickets: result[0].toNumber(),
                userTokens: result[1].toNumber(),
            })
            // console.log(result[0].toNumber());
            // console.log(result[1]);
        });
    }

    getEthAddress() {
        const seed = this.props.registeredUser && this.props.registeredUser._id;
        console.log(this.props.registeredUser);
        // if (! this.props.registeredUser.account) {
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
                    Session.set('userAddress', addr)
                    Meteor.call('admin.fundAddress', seed, addr);
                
                });
            });
        // }
    }

    componentWillMount() {
        this.getUserInfo.bind(this);
    }
 
    render() {
        
        return (
            <container className="container">
                <hr />
                <div className="user-info-div">
                    <h2>Registered Tickets: {this.state.userTickets}</h2>
                    <h2>Tokens Won: {this.state.userTokens}</h2>

                </div>
                <hr />
            </container>
        )
    }

}

UserInfo.PropTypes = {
    registeredUser: PropTypes.object.isRequired,
}
