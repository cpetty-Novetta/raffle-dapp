import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


EthereumAbi = require('ethereumjs-abi');
walletjs = require("ethereumjs-wallet");
EthereumTx = require("ethereumjs-tx");

export default class RegisterForTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numTicketsToRegister: this.props.currentUser.raffleTicketsToRegister,
        }
    }

    countTicketsToRegister() {
        numTickets = this.state.numTicketsToRegister;
        let user = this.props.currentUser;
        if (user.company !== '') {
            numTickets--;
        }
        if (user.reason !== '') {
            numTickets--;
        }
        this.setState({ numTicketsToRegister: numTickets});
    }

    handleSubmit(event) {
        event.preventDefault();
        const CompanyText = '';
        const ReasonText = '' ;
        // Find the text field via the React ref
        if(ReactDOM.findDOMNode(this.refs.userCompany)) {
            const CompanyText = ReactDOM.findDOMNode(this.refs.userCompany).value.trim();
            Meteor.call('user.updateCompany', this.props.currentUser._id, CompanyText);
        } 
        if (ReactDOM.findDOMNode(this.refs.userReason)) {
            const ReasonText =  ReactDOM.findDOMNode(this.refs.userReason).value.trim();
            Meteor.call('user.updateReason', this.props.currentUser._id, ReasonText);
        } 

        dummy = () => {
            this.registerUser();
        }
        Meteor.setTimeout(dummy, 200);

        // Clear form
        if(ReactDOM.findDOMNode(this.refs.userCompany)) {
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
        }
        if(ReactDOM.findDOMNode(this.refs.userReason)) {
            ReactDOM.findDOMNode(this.refs.userReason).value = '';
        }
    }

    registerUser () {
        var numTickets = 0;
        var userAddress = this.props.currentUser.account;
        var privateKey = new Buffer(this.props.currentUser.privKey, 'hex');
        console.log('registered address: ', userAddress);
        var username = this.props.currentUser.username;
        console.log('sent username: ', username);
        var email = this.props.currentUser.emails[0].address;
        console.log('sent email: ', email);
        var companyName = this.props.currentUser.company;
        console.log('sent company text: ', companyName);
        var reasonHere = this.props.currentUser.reason;
        console.log('sent reason text: ', reasonHere);
        if (email) {
            console.log("Adding ticket for email: ", email);
            numTickets++;
        }
        if (companyName) {
            console.log("Adding ticket for company name: ", companyName);
            numTickets++;
        }
        if (reasonHere) {
            console.log("Adding ticket for reason here: ", reasonHere);
            numTickets++;
        }

        var contractState = {
            registerTicketsToUser: {
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, numTickets],
            }
        }


        function signedTxAssembler(methodObj, contract_address) {
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

        web3.eth.sendRawTransaction(signedTxAssembler(contractState.registerTicketsToUser, contract_address), (err,txHash) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Raw TX result: ", txHash);
                web3.eth.getTransaction(txHash, (err, tx) => {
                    console.log("getTx Result: ", tx);
                })
                web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
                        console.log("tx receipt: ", receipt);
                })
                Meteor.call('user.setRegistered', this.props.currentUser._id, 'isRegistered', true);
                Meteor.call('user.updateNumTicketsRegistered', this.props.currentUser._id, this.state.numTicketsToRegister)
            }
        });
    }

    componentDidMount() {
        const dummy = () => {
            this.countTicketsToRegister();
        }
        dummy()
    }

    render() {
        

        return (
                <div className="register-div row" >
                {this.props.currentUser.isRegistered ? '' :
                    <div>
                    <h4>Enter more information for more tickets!</h4>
                    <p className="text-flow">You can register the following info for {this.state.numTicketsToRegister} more raffle tickets</p>
                    <form className="new-register col s12" onSubmit={this.handleSubmit.bind(this)} >
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
                                <input 
                                    type="text"
                                    ref="userReason"
                                    placeholder="How'd you hear about this?"
                                />
                            </div>
                        </div>: null
                        }
                        <div className="row">
                            <button className="waves-effect waves-light btn">Register</button>
                        </div> 
                    </form>
                    </div>
                }
                </div>
                
        )
    }

}
