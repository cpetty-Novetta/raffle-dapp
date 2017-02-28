import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class DistributeFunds extends Component {
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

        this.handleSubmit.bind(this);
        this.getCurrentStage.bind(this);
        this.closeRegistration.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const CompanyText = ReactDOM.findDOMNode(this.refs.userCompany).value.trim();
        const ReasonText =  ReactDOM.findDOMNode(this.refs.userReason).value.trim();

        // For our Novetta Database reasons
        Meteor.call('ticket.register', CompanyText, ReasonText);

        // To call smart contract
        user_props = {
            company: CompanyText,
            reason: ReasonText
        };
        this.registerUser(user_props);

        // Clear form
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
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
            <container className="distribute-container">
                <div className="stage-div">
                    <span className="current-stage flow-text">Current Stage: {this.state.currentStage}</span>
                </div>
                <div className="close-registration-div">
                    <button className="waves-effect waves-light btn" onClick={this.closeRegistration}>Close Registration</button>
                </div>
                <div className="distribute-div" >
                    <button className="waves-effect waves-light btn" onClick={this.distributeFunds}>Distribute Funds</button>
                </div>
            </container>
        )
    }

}

DistributeFunds.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
