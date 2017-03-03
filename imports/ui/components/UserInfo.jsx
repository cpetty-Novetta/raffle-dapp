import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { keystore, txutils } from 'eth-lightwallet';

import "./UserInfo.scss";

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
        console.log("user account: ",this.props.currentUser.account)

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
                    Meteor.call('user.updateAddress',seed, addr);
                    if (Session.get('userAddress') === '') {
                        Session.set('userAddress', addr)
                    }
                    Meteor.call('admin.fundAddress', seed, addr);
                })
               
            }, function (result) {
                console.log("result :",result);
            })
            
            
                
            
        }
        console.log(keystore.getAddresses());
        Meteor.setTimeout(() => {console.log(ks)}, 3000);

        
    }
    
    componentDidMount() {
        // this.getEthAddress();
        const refreshStats = () => {
            this.getUserInfo();
        }

        this.refreshInterval = setInterval(() => {
            if (this.state.hasAddress) {
                refreshStats();
                return refreshStats;
            } else {
                return '';
            }
        }, 10000)
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


