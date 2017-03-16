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
            numTicketsRegistered: this.props.currentUser.numEarnedTickets ? this.props.currentUser.numEarnedTickets : 0,
            numTicketsToAllocate: this.props.currentUser.numEarnedTickets ? this.props.currentUser.numEarnedTickets : 0,
            ledgerTickets: 0,
            tshirtTickets: 0,
        }
    }

    addLedgerTicket() {
        if (this.state.ledgerTickets < this.state.numTicketsRegistered && this.state.numTicketsToAllocate > 0) {
            this.setState({
                ledgerTickets: this.state.ledgerTickets + 1,
                numTicketsToAllocate: this.state.numTicketsToAllocate - 1,
            })
        }
    }
    removeLedgerTicket() {
        if (this.state.ledgerTickets !== 0 && this.state.numTicketsToAllocate >= 0) {
            this.setState({
                ledgerTickets: this.state.ledgerTickets - 1,
                numTicketsToAllocate: this.state.numTicketsToAllocate + 1,
            })
        }
    }
    addTshirtTicket() {
        if (this.state.tshirtTickets < this.state.numTicketsRegistered && this.state.numTicketsToAllocate > 0) {
            this.setState({
                tshirtTickets: this.state.tshirtTickets + 1,
                numTicketsToAllocate: this.state.numTicketsToAllocate - 1,
            })
        }
    }
    removeTshirtTicket() {
        if (this.state.tshirtTickets !== 0 && this.state.numTicketsToAllocate >= 0) {
            this.setState({
                tshirtTickets: this.state.tshirtTickets - 1,
                numTicketsToAllocate: this.state.numTicketsToAllocate + 1,
            })
        }
    }

    registerUser () {
        var userAddress = this.props.currentUser.account;
        var username = this.props.currentUser.username;

        var contractState = {
            registerLedgerTicketsToUser: {
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.ledgerTickets],
            },
            registerTshirtTicketsToUser: {
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.tshirtTickets],
            }
        }

        this.sendTx(contractState.registerLedgerTicketsToUser, contract_address);
        this.sendTx(contractState.registerTshirtTicketsToUser, tshirt_address);
        Meteor.call('user.updateNumTicketsRegistered', this.props.currentUser._id, this.state.numTicketsRegistered)
        Meteor.call('user.setRegistered', this.props.currentUser._id, 'isRegistered', true);
    }

    sendTx(contractStateObject, contractAddress) {
        var privateKey = new Buffer(this.props.currentUser.privKey, 'hex');
        function signedTxAssembler(methodObj, contractAddress) {
            var methodID = EthereumAbi.methodID(methodObj.name, methodObj.dataTypes).toString('hex');
            var functionArgs = EthereumAbi.rawEncode(methodObj.dataTypes, methodObj.inputs).toString('hex');
            var unsignedData = '0x' + methodID + functionArgs;
            var rawTx = {
                to: contractAddress,
                value: '0x00',
                data: unsignedData,
                gasPrice: 5000000,
                gasLimit: "0x2fefd8",
                nonce: '0x00',
            }
            var tx = new EthereumTx(rawTx);
            tx.sign(privateKey);
            var serializedTx = tx.serialize().toString('hex');
            return '0x' + serializedTx;
        }

        web3.eth.sendRawTransaction(signedTxAssembler(contractStateObject, contractAddress), (err,txHash) => {
            if (err) {
                console.log(err);
            } else {
                console.log("txHash: ", txHash);
                web3.eth.getTransaction(txHash, (err, tx) => {
                    console.log("getTx Result: ", tx);
                })
                web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
                        console.log("tx receipt: ", receipt);
                })
            }
        });

    }

    componentDidMount() {
    }

    render() {
        

        return (
                <div className="section" >
                    <h5 className="flow-text">You have {this.state.numTicketsToAllocate} tickets left to register for prizes</h5>
                    <div className="row">
                        <div className="col s4 center">
                            <p className="flow-text">Ledger Nano</p>
                            <p className="flow-text">Tickets: {this.state.ledgerTickets}</p>
                            <img className="reactive-img" src="/img/ledgernano.png" />
                            <br/>
                            <button className="btn-floating btn-small waves-effect waves-light blue lighten-2" onClick={this.addLedgerTicket.bind(this)}><i className="material-icons">add</i></button>
                            <button className="btn-floating btn-small waves-effect waves-light blue lighten-2" onClick={this.removeLedgerTicket.bind(this)}><i className="material-icons">remove</i></button>
                        </div>
                        <div className="col s4 center">
                            <p className="flow-text">Tshirt</p>
                            <p className="flow-text">Tickets: {this.state.tshirtTickets}</p>
                            <img className="reactive-img" src="/img/tshirt.png" />
                            <br/>
                            <button className="btn-floating btn-small waves-effect waves-light blue lighten-2" onClick={this.addTshirtTicket.bind(this)}><i className="material-icons">add</i></button>
                            <button className="btn-floating btn-small waves-effect waves-light blue lighten-2" onClick={this.removeTshirtTicket.bind(this)}><i className="material-icons">remove</i></button>
                        </div> 
                    </div> 
                    
                    <div className="row center">
                        <button className="waves-effect waves-light btn" onClick={this.registerUser.bind(this)}>Lock {this.state.ledgerTickets + this.state.tshirtTickets} tickets into smart contract</button>
                    </div>
                </div>
                
        )
    }

}
