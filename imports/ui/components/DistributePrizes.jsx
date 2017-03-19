import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
let contract = require("truffle-contract");

let LedgerInstance = contract(ledger_json);
LedgerInstance.setProvider(provider);
let TshirtInstance = contract(tshirt_json);
TshirtInstance.setProvider(provider);
let BitcoinBookInstance = contract(bitcoinBook_json);
BitcoinBookInstance.setProvider(provider);
let DappBookInstance = contract(dappBook_json);
DappBookInstance.setProvider(provider);
let InternetBookInstance = contract(internetBook_json);
InternetBookInstance.setProvider(provider);
let GraphBookInstance = contract(graphBook_json);
GraphBookInstance.setProvider(provider);
let MakersBookInstance = contract(makersBook_json);
MakersBookInstance.setProvider(provider);

const contractState = {
            closeLedgerRegistration: {
                name: "closeRegistration",
                dataTypes: [],
                inputs: [],
            },
            distributeLedgerPrizes: {
                name: "distributePrizes",
                dataTypes: [],
                inputs: [],
            },
        }

export default class DistributePrizes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: this.props.currentUser.account,
            currentStage: this.props.ledgerContractState[0].currentStage,
        };

        this.stages = {
            0: 'Registration',
            1: 'Distribution',
            2: 'Disbursed',
        }
    }

    serverTruffleInstance() {
    }

    closeRegistration() {
        LedgerInstance.deployed().then(function(instance) {
            Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Ledger closeRegistration Result: ", result)
        }).then(function() {
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        TshirtInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Tshirt closeRegistration Result: ", result)
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        BitcoinBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("BitcoinBook closeRegistration Result: ", result)
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        DappBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Dapp closeRegistration Result: ", result)
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        InternetBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Internet closeRegistration Result: ", result)
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        MakersBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Makers closeRegistration Result: ", result)
            // Meteor.call('user.isMining', Meteor.userId(), false);
        })
        GraphBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Graph closeRegistration Result: ", result)
            Meteor.call('user.isMining', Meteor.userId(), false);
        })
    }

    distributePrizes() {
        LedgerInstance.deployed().then(function(instance) {
            Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            // Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Ledger distributePrizes Result: ", result)
        })
        TshirtInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Tshirt distributePrizes Result: ", result)
        })
        BitcoinBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Bitcoin distributePrizes Result: ", result)
        })
        GraphBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Graph distributePrizes Result: ", result)
        })
        DappBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Dapp distributePrizes Result: ", result)
        })
        InternetBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Internet distributePrizes Result: ", result)
        })
        MakersBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Makers distributePrizes Result: ", result)
        })
    }

    sendTx(contractStateObject, contractAddress, txNonce) {
        
        var privateKey = new Buffer(this.props.currentUser.privKey, 'hex');
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

        web3.eth.sendRawTransaction(signedTxAssembler(contractStateObject, contractAddress, txNonce), (err,txHash) => {
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

    componentWillMount() {
        // this.serverWeb3Instance();
        this.serverTruffleInstance();
    }
 
    render() {
        
        return (
            <div className="section">

                {this.props.ledgerContractState[0].currentStage === "Registration" && !this.props.currentUser.isMining ?
                    <div className="row center">
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.closeRegistration.bind(this)}>Close Registration</button>
                    </div> : 
                    <div className="row center">
                        <button className="waves-effect waves-light btn disabled" onClick={this.closeRegistration.bind(this)}>Close Registration</button>
                    </div>
                }
                {this.props.ledgerContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributePrizes.bind(this)}>Distribute Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" onClick={this.distributePrizes.bind(this)}>Distribute Prizes</button>
                    </div>
                }
            </div>
        )
    }

}

DistributePrizes.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
