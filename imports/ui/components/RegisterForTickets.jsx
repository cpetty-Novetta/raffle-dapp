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
        numTickets--;
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



    componentDidMount() {
        const dummy = () => {
            this.countTicketsToRegister();
        }
        dummy()
    }

    render() {
        

        return (
                <div className="section" >
                {this.props.currentUser.isRegistered ? '' :
                    <div >
                        {this.state.numTicketsToRegister !== 0 ?
                            
                            <p className="text-flow">You can register the following info for {this.state.numTicketsToRegister} more raffle tickets</p> :
                            null
                        }
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
                            {this.props.ledgerContractState[0].currentStage === "Registration" ?
                                <div className="row">
                                    <button className="waves-effect waves-light btn">Register for {this.props.currentUser.raffleTicketsToRegister} tickets now!</button>
                                </div> : 
                                <div className="row">
                                    <button className="waves-effect waves-light btn disabled">Registration Closed!</button>
                                </div>
                            }
                    </form>
                    </div>
                }
                </div>
                
        )
    }

}
