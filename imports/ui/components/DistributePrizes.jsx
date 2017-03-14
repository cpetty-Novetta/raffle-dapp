import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class DistributePrizes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: this.props.currentUser.account,
            currentStage: this.props.contractState[0].currentStage,

        };

        this.stages = {
            0: 'Registration',
            1: 'Distribution',
            2: 'Disbursed',
        }

        this.contractState = {
            closeRegistration: {
                name: "closeRegistration",
                dataTypes: [],
                inputs: [],
            }
        }
    }

    serverWeb3Instance() {
        var json = require("/imports/smart-contracts/build/contracts/JailbreakRaffle.json");
        contract_abi = json["abi"];
        contract_address = json["networks"]["1900"].address;

        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        web3.eth.getAccounts((err, accs) => {
            if (err != null) {
                // alert("There was an error fething accounts.");
                return;
            }

            if (accs.length == 0)  {
                // alert("Couldn't get any accounts! Make sure Ethereum client is running.")
            }

            accounts = accs;
            coinbase = accs[0];
            console.log("Admin Web3 Instantiated");

            var RaffleWeb3 = web3.eth.contract(contract_abi);
            RaffleWeb3Instance = RaffleWeb3.at(contract_address);
        })
    }

    closeRegistration() {
        RaffleWeb3Instance.closeRegistration({from: web3.eth.coinbase}, (err) => {
            if (err) {
                console.log("err:  ", err);
            }
            Meteor.call('updateStage');
        })
        
    }

    distributePrizes() {
        RaffleWeb3Instance.distributePrizes({from: web3.eth.coinbase, gas: 500000}, function(err,result) {
            if (err) {
                console.log("This is the error: ",err)
            }
            console.log(result)
            console.log("Prizes have been distributed!");
        })
    }

    componentWillMount() {
        this.serverWeb3Instance();
    }
 
    render() {
        
        return (
            <div className="section">

                {this.props.contractState[0].currentStage === "Registration" ?
                    <div className="row">
                        <button className="waves-effect waves-light btn" onClick={this.closeRegistration}>Close Registration</button>
                    </div> : 
                    <div className="row">
                        <button className="waves-effect waves-light btn disabled" onClick={this.closeRegistration}>Close Registration</button>
                    </div>
                }
                {this.props.contractState[0].currentStage === "Distribution" ?
                    <div className="row" >
                        <button className="waves-effect waves-light btn" onClick={this.distributePrizes}>Distribute Funds</button>
                    </div> : 
                    <div className="row" >
                        <button className="waves-effect waves-light btn disabled" onClick={this.distributePrizes}>Distribute Prizes</button>
                    </div>
                }
            </div>
        )
    }

}

DistributePrizes.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
