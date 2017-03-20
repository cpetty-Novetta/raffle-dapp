import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

const walletjs = require("ethereumjs-wallet");
const EthereumTx = require("ethereumjs-tx");
const EthereumAbi = require('ethereumjs-abi');

let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let PNF = require('google-libphonenumber').PhoneNumberFormat;

import "/imports/ui/components/UserInfo.scss";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userFunded: false,
        }
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
            if (!this.props.currentUser.isFunded) {
                Meteor.call('admin.fundAddress', userId, address);
            }
        }
        if ( this.props.currentUser && this.props.currentUser.privKey) {
            console.log("recreating wallet from private key");
            wallet = walletjs.fromPrivateKey(new Buffer(this.props.currentUser.privKey, 'hex'));
            publicKey = wallet.getPublicKeyString();
            address = wallet.getAddressString();
        }
    }

    updateElligibleTickets() {
        let numTickets = 3;
        if (this.props.currentUser.company) {
            numTickets++;
        }
        if (this.props.currentUser.reason) {
            numTickets++;
        }
        if (this.props.currentUser.phone) {
            numTickets++;
        }
        if (numTickets !== this.props.currentUser.numEarnedTickets) {
            Meteor.call('user.updateEarnedTickets', this.props.currentUser._id, numTickets);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var ele = $(event.target);
        const PhoneText = '';
        const CompanyText = '';
        let formattedNumber;
        // Find the text field via the React ref
        if(ReactDOM.findDOMNode(this.refs.userPhone)) {
            const PhoneText = ReactDOM.findDOMNode(this.refs.userPhone).value.trim();
            if (PhoneText) {
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
        if (ele.find('#reason').val()) {
            ReasonText = ele.find("#reason").val();
            Meteor.call('user.updateReason', this.props.currentUser._id, ReasonText);
        } 
        // Clear form
        if(ReactDOM.findDOMNode(this.refs.userPhone)) {
        ReactDOM.findDOMNode(this.refs.userPhone).value = '';
        }
        if(ReactDOM.findDOMNode(this.refs.userCompany)) {
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
        }
    }

    componentDidUpdate() {
        this.updateElligibleTickets();
    }

    componentDidMount() {
        $('select').material_select();
        $('.collapsible').collapsible();
    }

    render() {
        let isActive = "collapsible-header " + this.props.currentUser.numEarnedTickets === 6 ? "" : "active"; 
        if (! this.props.userLoaded ) {
            return (
                <p>Loading info from server</p>
            )
        }
        return (
            <div>
                    <div>
                    {this.props.currentUser.isRegistered ? 
                        <p className="flow-text blue-text lighten-1 center">Tickets Locked in smart contracts</p> : 
                        <p className="flow-text center blue-text lighten-1">Elligible Tickets: {this.props.currentUser.numEarnedTickets}</p>
                    }
                    {this.props.currentUser.account && this.props.currentUser.isFunded ?  
                        <p className="flow-text truncate">Ethereum Address: {this.props.currentUser.account}</p> :
                        <p className="flow-text red-text">Getting and Funding Ethereum Address{this.getEthAddress()}</p>
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
                        <select className="browser-default" id="reason">
                            <option value='' disabled selected="selected">How did you hear about this?</option>
                            <option value="Cyberwire Podcast">Cyberwire</option>
                            <option value="The Bitcoin Podcast">The Bitcoin Podcast</option>
                            <option value="Novetta">Novetta</option>
                            <option value="Jailbreak Brewing Company">Jailbreak Brewing Company</option>
                            <option value="Stumbled in">Stumbled into here</option>
                        </select>
                        <label htmlFor="reason" />
                    </div>
                    </div>: null
                    }
                    {this.props.currentUser.isRegistered ? 
                        <div className="row center">
                            <p className="flow-text center">You've already allocated your tickets.</p>
                            <p className="flow-text center">Tap on "Raffle Prize Allocation" to see what everyone is registering for.</p>
                        </div> :
                        <div>
                            {this.props.ledgerContractState[0].currentStage === "Registration" && !this.props.currentUser.earnedAllTickets  ?
                                <div className="row center">
                                    <button className="waves-effect waves-light btn">Register for more tickets now!</button>
                                </div> :
                                <div className="row center">
                                    <div className="row">
                                        <button className="waves-effect waves-light btn disabled">You've got max tickets!</button>
                                    </div>
                                    <div className="row">
                                        <span className="flow-text">Tap on "Ticket Allocation" to register for prizes</span>
                                    </div>
                                </div> 
                            }
                        </div>
                    }
                    </form>
                </div>
            </div>
        )
    }

}


