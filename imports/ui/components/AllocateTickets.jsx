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
            numTicketsAllocated: 0,
            ledgerTickets: 0,
            tshirtTickets: 0,
            bitcoinBookTickets: 0,
            graphBookTickets: 0,
            internetBookTickets: 0,
            dappBookTickets: 0,
            makersBookTickets: 0,
        }

        // this.addTicket = this.addTicket.bind(this)
    }

    addLedgerTicket() {
        if (this.state.ledgerTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({ledgerTickets: this.state.ledgerTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeLedgerTicket() {
        if (this.state.ledgerTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({ledgerTickets: this.state.ledgerTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addTshirtTicket() {
        if (this.state.tshirtTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({tshirtTickets: this.state.tshirtTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeTshirtTicket() {
        if (this.state.tshirtTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({tshirtTickets: this.state.tshirtTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addBitcoinBookTicket() {
        if (this.state.bitcoinBookTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({bitcoinBookTickets: this.state.bitcoinBookTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeBitcoinBookTicket() {
        if (this.state.bitcoinBookTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({bitcoinBookTickets: this.state.bitcoinBookTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addGraphBookTicket() {
        if (this.state.graphBookTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({graphBookTickets: this.state.graphBookTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeGraphBookTicket() {
        if (this.state.graphBookTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({graphBookTickets: this.state.graphBookTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addInternetBookTicket() {
        if (this.state.internetBookTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({internetBookTickets: this.state.internetBookTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeInternetBookTicket() {
        if (this.state.internetBookTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({internetBookTickets: this.state.internetBookTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addDappBookTicket() {
        if (this.state.dappBookTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({dappBookTickets: this.state.dappBookTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeDappBookTicket() {
        if (this.state.dappBookTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({dappBookTickets: this.state.dappBookTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }
    addMakersBookTicket() {
        if (this.state.makersBookTickets < this.props.currentUser.numEarnedTickets && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated > 0) {
            this.setState({makersBookTickets: this.state.makersBookTickets + 1, numTicketsAllocated: this.state.numTicketsAllocated + 1,})
        }
    }
    removeMakersBookTicket() {
        if (this.state.makersBookTickets !== 0 && this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated >= 0) {
            this.setState({makersBookTickets: this.state.makersBookTickets - 1, numTicketsAllocated: this.state.numTicketsAllocated - 1,})
        }
    }

    warnUser() {
        <div id="modal1" className="modal">
            <div className="modal-content">
            <h4>Are you sure?</h4>
            <p>This is a one-time process.  After locking your tickets with the Ethereum smart contacts, you cannot change or add tickets.  Are you sure you would like to continue and lock your tickets in?</p>
            </div>
            <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
    }

    registerUser () {
        let userAddress = this.props.currentUser.account;
        let username = this.props.currentUser.username;
        let nonce = this.props.currentUser.nonce ? this.props.currentUser.nonce : 0;

        var contractState = {
            registerLedgerTicketsToUser: {
                raffle: "Ledger Nano",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.ledgerTickets],
            },
            registerTshirtTicketsToUser: {
                raffle: "Novetta T-shirt",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.tshirtTickets],
            },
            registerBitcoinBookTicketsToUser: {
                raffle: "Mastering Bitcoin",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.bitcoinBookTickets],
            },
            registerGraphBookTicketsToUser: {
                raffle: "Graph Databases",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.graphBookTickets],
            },registerDappBookTicketsToUser: {
                raffle: "Decentralized Applications",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.dappBookTickets],
            },registerInternetBookTicketsToUser: {
                raffle: "Risky Internet Book",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.internetBookTickets],
            },registerMakersBookTicketsToUser: {
                raffle: "Maker's notebook",
                name: "registerTicketsToUser",
                dataTypes: ["string", "address", "uint"],
                inputs: [username, userAddress, this.state.makersBookTickets],
            },
        }
        this.sendTx(contractState.registerLedgerTicketsToUser, ledger_address, nonce);
        this.sendTx(contractState.registerTshirtTicketsToUser, tshirt_address, nonce + 1);
        this.sendTx(contractState.registerBitcoinBookTicketsToUser, bitcoinBook_address, nonce + 2);
        this.sendTx(contractState.registerGraphBookTicketsToUser, graphBook_address, nonce + 3);
        this.sendTx(contractState.registerDappBookTicketsToUser, dappBook_address, nonce + 4);
        this.sendTx(contractState.registerInternetBookTicketsToUser, internetBook_address, nonce + 5);
        this.sendTx(contractState.registerMakersBookTicketsToUser, makersBook_address, nonce + 6);
        
        Meteor.call('user.increaseNonce', this.props.currentUser._id, nonce + 6)
        Meteor.call('user.updateTicketsRegistered', this.props.currentUser._id, this.state.numTicketsAllocated)
        Meteor.call('user.setRegistered', this.props.currentUser._id, 'isRegistered', true);

    }

    sendTx(contractStateObject, contractAddress, txNonce) {
        var privateKey = new Buffer(this.props.currentUser.privKey, 'hex');
        var address = this.props.currentUser.account;
        function signedTxAssembler(methodObj, contractAddress, txNonce) {
            var methodID = EthereumAbi.methodID(methodObj.name, methodObj.dataTypes).toString('hex');
            var functionArgs = EthereumAbi.rawEncode(methodObj.dataTypes, methodObj.inputs).toString('hex');
            var unsignedData = '0x' + methodID + functionArgs;
            var rawTx = {
                to: contractAddress,
                value: '0x00',
                data: unsignedData,
                gasPrice: 20000000000,
                gasLimit: 4712388,
                nonce: txNonce,
            }
            var tx = new EthereumTx(rawTx);
            tx.sign(privateKey);
            var serializedTx = tx.serialize().toString('hex');
            return '0x' + serializedTx;
        }

        web3.eth.sendRawTransaction(signedTxAssembler(contractStateObject, contractAddress, txNonce), {gas: 1000000}, function(err,txHash) {
            if (err) throw err;
            if (!err) {
                Meteor.call('user.isMining', Meteor.userId(), true);
                web3.eth.getTransactionReceiptMined(txHash)
                .then(function(receipt) {
                    Meteor.call('user.isMining', Meteor.userId(), false)
                    console.log("Tx receipt: ",receipt);
                    if (contractStateObject.inputs[2] !== 0) {
                        Materialize.toast(contractStateObject.raffle + " tickets are locked in!", 4000)
                    }
                    
                });
            }
        });
    }

    componentDidMount() {
        $('.modal').modal();
    }

    render() {

        return (
                <div className="" >
                    <h5 className="center">You have <span className="blue-text">{this.props.currentUser.numEarnedTickets - this.state.numTicketsAllocated}</span> tickets left to register for prizes</h5>
                    <div className="allocation-box">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/ledgernano.png"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Ledger Nano</p>
                                <p className="flow-text">Tickets: {this.state.ledgerTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addLedgerTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeLedgerTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/tshirt.png"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Novetta Tshirt</p>
                                <p className="flow-text">Tickets: {this.state.tshirtTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addTshirtTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeTshirtTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/bitcoinBook.jpg"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Mastering Bitcoin</p>
                                <p className="flow-text">Tickets: {this.state.bitcoinBookTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addBitcoinBookTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeBitcoinBookTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/graphBook.jpg"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Graph Databases</p>
                                <p className="flow-text">Tickets: {this.state.graphBookTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addGraphBookTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeGraphBookTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/dappBook.jpg"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Decentralized Applications</p>
                                <p className="flow-text">Tickets: {this.state.dappBookTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addDappBookTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeDappBookTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/internetBook.jpg"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">The Internet of Risky Things</p>
                                <p className="flow-text">Tickets: {this.state.internetBookTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addInternetBookTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeInternetBookTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="row valign-wrapper">
                            <div className="card-image-div col s4 center">
                                <img className="responsive-img valign" src="/img/makersNotebook.jpg"/>
                            </div>
                            <div className="card-content-div col s6 center valign">
                                <p className="flow-text">Makers Notebook</p>
                                <p className="flow-text">Tickets: {this.state.makersBookTickets}</p>
                            </div>
                            <div className="card-button-div col s2 valign">
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.addMakersBookTicket.bind(this)}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small waves-effect waves-light blue lighten-1" onClick={this.removeMakersBookTicket.bind(this)}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    {this.props.currentUser.isFunded && !this.props.currentUser.isMining && this.state.numTicketsAllocated === this.props.currentUser.numEarnedTickets ? 
                        <div className="row center">
                            <button data-target="modal1"  className="waves-effect waves-light btn blue lighten-1" onClick={$('#model1').modal('open')}>Lock {this.state.numTicketsAllocated} tickets into smart contracts</button>
                        </div> :
                        <div className="row center">
                            <button className="waves-effect waves-light btn disabled" onClick={this.registerUser.bind(this)}>Please allocate all of your tickets to prizes</button>
                        </div>
                    }
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                        <h4>Are you sure?</h4>
                        <p className="flow-text">This is a one-time process.  After locking your tickets with the Ethereum smart contracts, you cannot change or add tickets.  </p>
                        <p className="flow-text spacer">Are you sure you would like to continue and lock your tickets in?</p>
                        </div>
                        <div className="modal-footer">
                        <a onClick={this.registerUser.bind(this)} className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                        <a onClick={$('#modal1').modal('close')} className=" modal-action modal-close waves-effect waves-red btn-flat">Nope</a>
                        </div>
                    </div>
                </div>
                
        )
    }

}
