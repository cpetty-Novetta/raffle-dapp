import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class AddressBook extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: '0x0FA35114670859028Cd4398a59f2D391b7771bDe',  // Current MetaMask account
            userCompany: '',
            userReason: '',
            currentStage: '',
        };

        this.stages = {
            0: 'Registration',
            1: 'Distribution',
            2: 'Disbursed',
        }

        this.generateAddress.bins(this);
    }

    handleSubmit() {
        
    }

    closeRegistration() {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.closeRegistration({from: coinbase});
        }).then((result) => {
            console.log(result);
            
        });
        this.getCurrentStage;
    }

    distributeFunds() {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.distributeFunds({from: coinbase});
        }).then((result) => {
            console.log(result);
            
        });
        this.getCurrentStage;
    }

    getCurrentStage() {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getStage({from: coinbase});
        }).then((result) => {
            
            this.setState({currentStage: this.stages[result.valueOf()]});
        });
    }

    componentWillMount() {
        this.getCurrentStage();
    }
 
    render() {
        
        return (
            <container className="address-container">
                <div className="current-address-div">
                    <span className="current-stage">Current Stage: {this.state.currentStage}</span>
                </div>
                <div className="close-registration-div">
                    <button onClick={this.closeRegistration}>Close Registration</button>
                </div>
                <div className="distribute-div" >
                    <button onClick={this.distributeFunds}>Distribute Funds</button>
                </div>
            </container>
        )
    }

}

AddressBook.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
