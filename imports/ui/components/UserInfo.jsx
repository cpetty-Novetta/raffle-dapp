import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const walletjs = require("ethereumjs-wallet");
const EthereumTx = require("ethereumjs-tx");
const EthereumAbi = require('ethereumjs-abi');

var json = require("/imports/smart-contracts/build/contracts/JailbreakRaffle.json");
var contract_abi = json["abi"];
var unlinked_binary = json["unlinked_binary"];
var contract_address = json["networks"]["1900"].address;

// import "/imports/ui/components/UserInfo.scss";

export default class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            numTicketsToRegister: 0,
        }
    }

    countTicketsToRegister() {
        numTickets = 1;
        let user = this.props.currentUser;
        if (user.company !== null) {
            numTickets++;
        }
        if (user.reason !== null) {
            numTickets++;
        }
        this.setState({ numTicketsToRegister: numTickets});
    }

    signedTxAssembler(methodObj, contract_address) {
        var methodID = EthereumAbi.methodID(methodObj.name, methodObj.dataTypes).toString('hex');
        console.log(methodID);

        var functionArgs = EthereumAbi.rawEncode(methodObj.dataTypes, methodObj.inputs).toString('hex');
        console.log(functionArgs);

        var unsignedData = '0x' + methodID + functionArgs;
        console.log("data: ", unsignedData);

        var rawTx = {
            to: contract_address,
            value: '0x00',
            data: unsignedData,
            gasPrice: 500000,
            gasLimit: "0x2fefd8",
            nonce: '0x00',
        }

        var tx = new EthereumTx(rawTx);
        tx.sign(privateKey);
        var serializedTx = tx.serialize().toString('hex');
        console.log("signed tx: ", serializedTx);
        return '0x' + serializedTx;
    }

    getEthAddress() {
        const userId = this.props.currentUser && this.props.currentUser._id;
        if ( this.props.currentUser && !this.props.currentUser.account) {
            wallet = walletjs.generate();
            publicKey = wallet.getPublicKey();
            privateKey = wallet.getPrivateKey();
            address = wallet.getAddressString();

            console.log("pubkey: ", wallet.getPublicKeyString());
            console.log("privkey: ", wallet.getPrivateKeyString());
            console.log("address: ", wallet.getAddressString());

            Meteor.call('user.updateAddress', this.props.currentUser._id, address);
            Meteor.call('user.updatePrivKey', this.props.currentUser._id, privateKey.toString('hex'));
            Meteor.call('admin.fundAddress', userId, address)
        }
        if ( this.props.currentUser && this.props.currentUser.privKey) {
            console.log("recreating wallet from private key");
            wallet = walletjs.fromPrivateKey(new Buffer(this.props.currentUser.privKey, 'hex'));
            publicKey = wallet.getPublicKeyString();
            address = wallet.getAddressString();
        }
    }
    
    componentDidMount() {
        const dummy = () => {
            this.countTicketsToRegister();
        }
        
        dummy()
        
        // const refreshStats = () => {
        // }

        // this.refreshInterval = setInterval(() => {
        //     if (this.state.hasAddress) {
        //         refreshStats();
        //         return refreshStats;
        //     } else {
        //         return '';
        //     }
        // }, 10000)
        // Meteor.setTimeout(dummy, 200);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    render() {
        if (! this.props.userLoaded ) {
            return (
                <p>Loading info from server</p>
            )
        }
        return (
            <container className="container">
                <hr />
                <div className="user-info-div">
                    <h4>Registered Tickets: {this.props.currentUser.raffleTicketsRegistered}</h4>
                </div>
                <div className="registered-div">
                    <hr />
                    <h4>Currently Registered Information:</h4>
                    {this.props.currentUser.isRegistered ? 
                        <p className="flow-text">Registered with Smart Contract</p> : 
                        <p>Elligible Tickets: {this.props.currentUser.raffleTicketsToRegister}</p>
                    }
                    
                    {this.props.currentUser.account ?  
                        <p className="flow-text">Ethereum Address: {this.props.currentUser.account}</p> :
                        <p className="flow-text">Getting Ethereum Address{this.getEthAddress()}</p>
                    }  
                    
                    <p className="flow-text">Username: {this.props.currentUser.username}</p>
                    <p className="flow-text">Email: {this.props.currentUser.emails[0].address}</p>
                    {this.props.currentUser.company ?
                        <p className="flow-text">Company: {this.props.currentUser.company}</p> : 
                        <p className="flow-text unregistered">Company unregistered</p>
                    }
                    {this.props.currentUser.reason ?
                        <p className="flow-text">Reason here: {this.props.currentUser.reason}</p> : 
                        <p className="flow-text unregistered">Reason unregistered</p>
                    }
                </div>
                <hr />
            </container>
        )
    }

}


