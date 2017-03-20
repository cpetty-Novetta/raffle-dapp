import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
// let provider = new Web3.providers.HttpProvider("http://52.168.76.154:8545");
let contract = require("truffle-contract");

let LedgerInstance = contract(ledger_json);
LedgerInstance.setProvider(provider);
let TshirtInstance = contract(tshirt_json);
TshirtInstance.setProvider(provider);
let TbpTshirtInstance = contract(tbpTshirt_json);
TbpTshirtInstance.setProvider(provider);
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
        TbpTshirtInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.closeRegistration({from: web3.eth.accounts[0]})
        }).then(function(result) {
            console.log("Tbp Tshirt closeRegistration Result: ", result)
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

    distributeLedgerPrizes() {
        LedgerInstance.deployed().then(function(instance) {
            Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            // Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Ledger distributePrizes Result: ", result)
        })
    }
    distributeTshirtPrizes() {
        TshirtInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Tshirt distributePrizes Result: ", result)
        })
    }
    distributeTbpTshirtPrizes() {
        TbpTshirtInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("TbptTshirt distributePrizes Result: ", result)
        })
    }
    distributeBitcoinBookPrizes() {
        BitcoinBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Bitcoin distributePrizes Result: ", result)
        })
    }
    distributeGraphBookPrizes() {
        GraphBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Graph distributePrizes Result: ", result)
        })
    }
    distributeDappBookPrizes() {
        DappBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Dapp distributePrizes Result: ", result)
        })
    }
    distributeInternetBookPrizes() {
        InternetBookInstance.deployed().then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Internet distributePrizes Result: ", result)
        })
    }
    distributeMakersBookPrizes() {
        MakersBookInstance.deployed(
        ).then(function(instance) {
            // Meteor.call('user.isMining', Meteor.userId(), true);
            return instance.distributePrizes({from: web3.eth.accounts[0], gas: 3000000})
        }).then(function(result) {
            Meteor.call('user.isMining', Meteor.userId(), false);
            console.log("Makers distributePrizes Result: ", result)
        })
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
                {this.props.tshirtContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeTshirtPrizes.bind(this)}>Distribute Tshirt Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Tshirt Prizes</button>
                    </div>
                }
                {this.props.tbpTshirtContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeTbpTshirtPrizes.bind(this)}>Distribute TBP Tshirt Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute TBP Tshirt Prizes</button>
                    </div>
                }
                {this.props.bitcoinBookContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeBitcoinBookPrizes.bind(this)}>Distribute Bitcoin book Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Bitcoin book Prizes</button>
                    </div>
                }
                {this.props.graphBookContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeGraphBookPrizes.bind(this)}>Distribute Graph book Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Graph book Prizes</button>
                    </div>
                }
                {this.props.dappBookContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeDappBookPrizes.bind(this)}>Distribute Dapp book Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Dapp book Prizes</button>
                    </div>
                }
                {this.props.internetBookContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeInternetBookPrizes.bind(this)}>Distribute Internet book Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Internet book Prizes</button>
                    </div>
                }
                {this.props.makersBookContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeMakersBookPrizes.bind(this)}>Distribute Makers book Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Makers book Prizes</button>
                    </div>
                }
                {this.props.ledgerContractState[0].currentStage === "Distribution" && !this.props.currentUser.isMining ?
                    <div className="row center" >
                        <button className="waves-effect waves-light btn  blue lighten-2" onClick={this.distributeLedgerPrizes.bind(this)}>Distribute Ledger Prizes</button>
                    </div> : 
                    <div className="row center" >
                        <button className="waves-effect waves-light btn disabled" >Distribute Ledger Prizes</button>
                    </div>
                }
            </div>
        )
    }

}

DistributePrizes.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
