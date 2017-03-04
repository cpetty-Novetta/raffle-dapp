import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { keystore, txutils } from 'eth-lightwallet';

// import "/imports/ui/components/UserInfo.scss";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: '',  
            userCompany: '',
            userReason: '',
            currentStage: '',
            userTokens: 0,
            userTickets: 0,
            hasAddress: false,
        };

        this.getUserInfo.bind(this);
        this.getEthAddress.bind(this);
    }

    getUserInfo() {
        var userAddress = this.props.currentUser.account;
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getUserInfo(userAddress, {from: userAddress});
        }).then((result) => {
            this.setState({
                userTickets: result[0].toNumber(),
                userTokens: result[1].toNumber(),
            })
        });
    }



    getEthAddress() {
        const userId = this.props.currentUser && this.props.currentUser._id;
        if ( this.props.currentUser && !this.props.currentUser.account) {
            var secretSeed = keystore.generateRandomSeed();
            keystore.deriveKeyFromPassword(userId, function(err, pwDerivedKey) {
                if (err) throw err;
                var ks = new keystore(secretSeed, pwDerivedKey);
                ks.generateNewAddress(pwDerivedKey, 1);
                var addresses = ks.getAddresses();
                addr = '0x' + addresses[0].valueOf();
                Meteor.call('user.updateSeed', userId, secretSeed);
                Meteor.call('user.updateAddress',userId, addr);
                Meteor.call('admin.fundAddress', userId, addr);
            });
        } 
        if ( this.props.currentUser && this.props.currentUser.seed) {
            var secretSeed = this.props.currentUser.seed;
            keystore.deriveKeyFromPassword(userId, function(err, pwDerivedKey) {
                if (err) throw err;
                var ks = new keystore(secretSeed, pwDerivedKey);
                ks.generateNewAddress(pwDerivedKey, 1);
                var addresses = ks.getAddresses();
                addr = '0x' + addresses[0].valueOf();
                console.log("Returned previously derived ETH address: ", addr);
            });
        }
    }
    
    componentDidMount() {
        const dummy = () => {
            this.getEthAddress();
        }
        
        
        const refreshStats = () => {
            this.getUserInfo.bind(this);
        }

        this.refreshInterval = setInterval(() => {
            if (this.state.hasAddress) {
                refreshStats();
                return refreshStats;
            } else {
                return '';
            }
        }, 10000)
        Meteor.setTimeout(dummy, 200);
    }

    componentWillMount() {
        // this.getEthAddress();
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    render() {
            
        return (
            
            <container className="container">
                <hr />
                <div className="user-info-div">
                    <h4>Registered Tickets: {this.state.userTickets}</h4>
                    <h4>Tokens Won: {this.state.userTokens}</h4>
                </div>
                <div className="registered-div">
                    <hr />
                    <h4>Currently Registered Information:</h4>
                    
                    {this.props.currentUser.account ?  
                        <p className="flow-text">Ethereum Address: {this.props.currentUser.account}</p> :
                        <p className="flow-text">Getting Ethereum Address</p>
                    }  
                    
                    <p className="flow-text">Username: {this.props.currentUser.username}</p>
                    <p className="flow-text">Email: {this.props.currentUser.emails[0].address}</p>
                    {this.props.currentUser.company ?
                        <p className="flow-text">Company: {this.props.currentUser.company}</p> : 
                        <p className="flow-text unregistered">Company unregistered</p>
                    }
                    {this.props.currentUser.company ?
                        <p className="flow-text">Reason here: {this.props.currentUser.reason}</p> : 
                        <p className="flow-text unregistered">Reason unregistered</p>
                    }
                </div>
                <hr />
            </container>
        )
    }

}


