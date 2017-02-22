import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class RegisterForTickets extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userAddress: '0x0FA35114670859028Cd4398a59f2D391b7771bDe',  // Current MetaMask account
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

    registerUser (user_props) {
        var userAddress = this.state.userAddress;
        var username = this.props.currentUser.username;
        var email = this.props.currentUser.emails[0].address;
        var companyName = user_props.company;
        var reasonHere = user_props.reason;

        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.registerUser(userAddress, username, email, companyName, reasonHere, {from: coinbase, gas: 500000});
        }).then((result) => {
            console.log(result);
        })
    }

    componentWillMount() {
    }
 
    render() {
        
        return (
            <container className="register-container">
                <div className="register-div" >
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
            </container>
        )
    }

}

RegisterForTickets.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
