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
        Meteor.call('user.insertCompany', this.props.currentUser._id, CompanyText);

        Meteor.call('user.insertReason', this.props.currentUser._id, ReasonText);

        

        this.registerUser();
        
        

        // Clear form
        ReactDOM.findDOMNode(this.refs.userCompany).value = '';
        ReactDOM.findDOMNode(this.refs.userReason).value = '';
    }

    

    

    registerUser () {
        var userAddress = Session.get('userAddress');
        console.log('registered address: ', userAddress);
        var username = this.props.currentUser.username;
        console.log('sent username: ', username);
        var email = this.props.currentUser.emails[0].address;
        console.log('sent email: ', email);
        var companyName = Session.get('userCompany');
        console.log('sent company text: ', companyName);
        var reasonHere = Session.get('userReason');
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
        // USE THESE IF YOU WANT RE-REGISTRATION
        // if (companyName.length > 0) {
        //     Meteor.call('user.setRegistered',this.props.currentUser._id, 'companyRegistered', true);
        // }
        // if (reasonHere.length > 0) {
        //     Meteor.call('user.setRegistered',this.props.currentUser._id, 'reasonRegistered', true);
        // }
        Meteor.call('user.setRegistered', this.props.registeredUser._id, 'registered', true);
    }

    componentWillMount() {
    }
 
    render() {
        

        return (
            <container className="register-container">
                <hr />
                <div className="registered-div">
                    <h2>Currently Registered Information:</h2>
                    {this.props.registeredUser.address ?  
                        <p>Ethereum Address: {this.props.registeredUser.address}</p> :
                        <p>Getting Ethereum Address</p>
                    }  
                    <p>Username: {this.props.registeredUser.username}</p>
                    <p>Email: {this.props.registeredUser.email}</p>
                </div>
                <div className="register-div" >
                    <h2>Enter more information for more tickets!</h2>
                    <form className="new-register" onSubmit={this.handleSubmit.bind(this)} >
                        <input 
                            type="text"
                            ref="userCompany"
                            placeholder="Your company"
                        />
                        <input 
                            type="text"
                            ref="userReason"
                            placeholder="How'd you hear about this?"
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
                <hr />
            </container>
        )
    }

}

RegisterForTickets.PropTypes = {
    registeredUser: PropTypes.object.isRequired,
}
