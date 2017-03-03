import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';



export default class RegisterForTickets extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: '', 
            userCompany: '',
            userReason: '',
        };

        this.handleSubmit.bind(this);
        this.registerUser.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const CompanyText = ReactDOM.findDOMNode(this.refs.userCompany).value.trim();
        Session.set('userCompany', CompanyText);
        const ReasonText =  ReactDOM.findDOMNode(this.refs.userReason).value.trim();
        Session.set('userReason', ReasonText);

        // For our Novetta Database reasons
        Meteor.call('user.updateCompany', this.props.currentUser._id, CompanyText);

        Meteor.call('user.updateReason', this.props.currentUser._id, ReasonText);

        this.registerUser.bind(this);
        
        

        // Clear form
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
        ReactDOM.findDOMNode(this.refs.userReason).value = '';
    }

    

    

    registerUser () {

        var userAddress = this.props.currentUser.account;
        console.log('registered address: ', userAddress);
        var username = this.props.currentUser.username;
        console.log('sent username: ', username);
        var email = this.props.currentUser.emails[0].address;
        console.log('sent email: ', email);
        var companyName = this.props.currentUser.company;
        console.log('sent company text: ', companyName);
        var reasonHere = this.props.currentUser.company;
        console.log('sent reason text: ', reasonHere);

        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            console.log('registered address2: ', userAddress);
            console.log('sent username2: ', username);
            console.log('sent email2: ', email);
            console.log('sent company text2: ', companyName);
            console.log('sent reason text2: ', reasonHere);
            return instance.registerUser(userAddress, username, email, companyName, reasonHere, {from: coinbase, gas: 500000});
        }).then((result) => {
            console.log("logs: ", result.logs);
            console.log("receipt: ", result.receipt);
            console.log("tx Hash: ", result.tx);
            console.log(result);
        })
        // Meteor.call('user.insertCompany', this.props.currentUser._id, CompanyName);
        // Meteor.call('user.insertReason', this.props.currentUser._id, RegisteredName);
        Meteor.call('user.setRegistered', this.props.currentUser._id, 'registered', true);
    }

    render() {
        

        return (
                <div className="register-div row" >
                {this.props.currentUser.company && this.props.currentUser.company ? '' :
                    <div>
                    <h4>Enter more information for more tickets!</h4>
                    <form className="new-register col s12" onSubmit={this.handleSubmit.bind(this)} >
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    className="validate"
                                    type="text"
                                    ref="userCompany"
                                    placeholder="Your company"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    type="text"
                                    ref="userReason"
                                    placeholder="How'd you hear about this?"
                                />
                            </div>
                        </div>
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
