import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const walletjs = require("ethereumjs-wallet");
const EthereumTx = require("ethereumjs-tx");
const EthereumAbi = require('ethereumjs-abi');

let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let PNF = require('google-libphonenumber').PhoneNumberFormat;

var json = require("/imports/smart-contracts/build/contracts/Raffle.json");
var contract_abi = json["abi"];
var unlinked_binary = json["unlinked_binary"];
var contract_address = json["networks"]["1900"].address;

import "/imports/ui/components/UserInfo.scss";

export default class UserInfo extends Component {
    constructor() {
        super();
        this.state = {
            numTicketsToAllocate: 0,
            earnedAllTickets: false,
        }
    }

    countElligibleTickets() {
        numTickets = 1;
        let user = this.props.currentUser;
        if (user.company !== '') {
            numTickets++;
        }
        if (user.reason !== '') {
            numTickets++;
        }
        if(user.phone !== '') {
            numTickets++;
        }
        this.setState({ numTicketsToAllocate: numTickets});
        if (user.reason !== '' && user.company !== '' && user.phone !== '') {
            this.setState({earnedAllTickets: true})
        }
        Meteor.call('user.updateEarnedTickets', this.props.currentUser._id, numTickets);
    }

    verifyPhoneNumber(inputNumber) {
        try {
            const parsedNumber = phoneUtil.parse(inputNumber, "US")
            return phoneUtil.format(parsedNumber, PNF.INTERNATIONAL);
        }
        catch (e) {
            Materialize.toast("Phone number is ill-formatted, try again. \n Ex: 800-555-1000", 4000);
        }
    }

    getEthAddress() {
        const userId = this.props.currentUser && this.props.currentUser._id;
        if ( this.props.currentUser && !this.props.currentUser.account) {
            wallet = walletjs.generate();
            publicKey = wallet.getPublicKey();
            privateKey = wallet.getPrivateKey();
            address = wallet.getAddressString();

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

    handleSubmit(event) {
        event.preventDefault();
        var ele = $(event.target);
        const PhoneText = '';
        const CompanyText = '';
        // Find the text field via the React ref
        if(ReactDOM.findDOMNode(this.refs.userPhone)) {
            const PhoneText = ReactDOM.findDOMNode(this.refs.userPhone).value.trim();
            if (PhoneText !== '') {
                formattedNumber = this.verifyPhoneNumber(PhoneText);
                console.log(formattedNumber)
            }
            if(formattedNumber === undefined && PhoneText !== '') {
                throw new Meteor.Error("Fix your phone number.");
            }
            Meteor.call('user.updatePhone', this.props.currentUser._id, formattedNumber);
        } 
        if(ReactDOM.findDOMNode(this.refs.userCompany)) {
            const CompanyText = ReactDOM.findDOMNode(this.refs.userCompany).value.trim();
            Meteor.call('user.updateCompany', this.props.currentUser._id, CompanyText);
        } 
        console.log(ele.find('#reason').val())
        if (ele.find('#reason').val() !== '') {
            ReasonText = ele.find("#reason").val();
            Meteor.call('user.updateReason', this.props.currentUser._id, ReasonText);
        } 
        this.countElligibleTickets();
        // Clear form
        if(ReactDOM.findDOMNode(this.refs.userPhone)) {
        ReactDOM.findDOMNode(this.refs.userPhone).value = '';
        }
        if(ReactDOM.findDOMNode(this.refs.userCompany)) {
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
        }
    }

    componentDidMount() {
        // console.log("UserInfo TshirtWeb3Instance: ",TshirtWeb3Instance)
        this.countElligibleTickets();
        // For Materialize Select element
        $('select').material_select();
        $('.collapsible').collapsible();
    }

    render() {
        if (! this.props.userLoaded ) {
            return (
                <p>Loading info from server</p>
            )
        }
        return (
            <div className="section">
                <ul className="collapsible" data-collapsible="expandable">
                    <li>
                        <div className="collapsible-header">
                            <h4 className="center">Currently Registered Information</h4>
                        </div>
                        <div className="collapsible-body">
                            {this.props.currentUser.isRegistered ? 
                                <p className="flow-text">Tickets Locked with Smart Contract</p> : 
                                <p className="flow-text">Elligible Tickets: {this.state.numTicketsToAllocate}</p>
                            }
                            {this.props.currentUser.account ?  
                                <p className="flow-text">Ethereum Address: {this.props.currentUser.account}</p> :
                                <p className="flow-text">Getting Ethereum Address{this.getEthAddress()}</p>
                            }                      
                            <p className="flow-text">Name: {this.props.currentUser.name}</p>
                            <p className="flow-text">Username: {this.props.currentUser.username}</p>
                            <p className="flow-text">Email: {this.props.currentUser.emails[0].address}</p>
                            {this.props.currentUser.phone ?
                                <p className="flow-text">Phone: {this.props.currentUser.phone}</p> : 
                                null
                            }
                            {this.props.currentUser.company ?
                                <p className="flow-text">Company: {this.props.currentUser.company}</p> : 
                                null
                            }
                            {this.props.currentUser.reason ?
                                <p className="flow-text">Reason here: {this.props.currentUser.reason}</p> : 
                                null
                            }
                            <form className="new-register col s12" onSubmit={this.handleSubmit.bind(this)} >
                            {! this.props.currentUser.phone ?
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input 
                                            className="validate"
                                            type="text"
                                            ref="userPhone"
                                            placeholder="Your phone number 999-999-9999"
                                        />
                                    </div>
                                </div> : null
                            }
                            {! this.props.currentUser.company ?
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input 
                                            className="validate"
                                            type="text"
                                            ref="userCompany"
                                            placeholder="Your company"
                                        />
                                    </div>
                                </div> : null
                            }
                            {! this.props.currentUser.reason ?
                            <div className="row">
                                <div className="input-field col s12">
                                    <select id="reason" value=''>
                                        <option value='' disabled>How did you hear about this?</option>
                                        <option value="Cyberwire Podcast">Cyberwire</option>
                                        <option value="The Bitcoin Podcast">The Bitcoin Podcast</option>
                                        <option value="Novetta">Novetta</option>
                                        <option value="Stumbled in">Stumbled into here</option>
                                    </select>
                                    <label htmlFor="reason" />
                               </div>
                            </div>: null
                            }
                            {this.props.ledgerContractState[0].currentStage === "Registration" && !this.state.earnedAllTickets  ?
                                <div className="row">
                                    <button className="waves-effect waves-light btn">Register for more tickets now!</button>
                                </div> : null
                            }
                    </form>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }

}


