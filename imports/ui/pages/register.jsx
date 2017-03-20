import React from 'react';
import { withRouter } from 'react-router-dom';
let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let PNF = require('google-libphonenumber').PhoneNumberFormat;

// import './Register.scss';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numTicketsEarned: 3,
        }
    }

    countTicketsToRegister(company, reason, phone) {
        let numTickets = 3;
        if (company) {
            numTickets++;
        }
        if (reason) {
            numTickets++;
        }
        if (phone) {
            numTickets++;
        }
        return numTickets;
    }

    verifyPhoneNumber(inputNumber) {
        try {
            const parsedNumber = phoneUtil.parse(inputNumber, "US")
            return phoneUtil.format(parsedNumber, PNF.INTERNATIONAL);
        }
        catch (e) {
            Materialize.toast("Phone number is ill-formatted, try again. \n Ex: 111-222-3333", 4000);
        }
    }

    handleSubmit(event) {
		event.preventDefault();
		var ele = $(event.target);

        var firstName = ele.find("#first_name").val();
        var lastName = ele.find("#last_name").val();
        var fullName = firstName + ' ' + lastName;
        let phone = ele.find('#phone').val();
        let formattedNumber;
        if (phone !== '') {
            formattedNumber = this.verifyPhoneNumber(phone);
        }
        var username = ele.find('#username').val();
		var email = ele.find("#email").val();
        var company = ele.find("#company").val();
        var reason = ele.find("#reason").val();
		var password = ele.find("#password").val();
		var confirmPassword = ele.find("#confirmPassword").val();
        var numTicketsEarned = this.countTicketsToRegister(company, reason, phone);
        if(formattedNumber === undefined && phone !== '') {
            throw new Meteor.Error("Fix your phone number.");
        } 
		else if(password === confirmPassword && password !== "" && confirmPassword !== "") {
			var accountInfo = {
				email: email,
				password: password,
                username: username,
			};
            Accounts.createUser(accountInfo, (er) => {
                if(er) {
                    Materialize.toast(er.reason, 4000);
                } else {
                    Meteor.call('user.updateName', Meteor.userId(), fullName ? fullName : '');
                    Meteor.call('user.updateCompany', Meteor.userId(), company ? company : '');
                    Meteor.call('user.updateReason', Meteor.userId(), reason ? reason : '');
                    Meteor.call('user.updatePhone', Meteor.userId(), formattedNumber ? formattedNumber : '');
                    Meteor.call('user.updateEarnedTickets', Meteor.userId(), numTicketsEarned);
                    Materialize.toast("You're logged in!", 4000);
                    this.props.history.push('/');
                }
            });
		} else {
			Materialize.toast('Your passwords dont match!', 4000);
		}
	}

    componentDidMount() {
        // For Materialize Select element
        $('select').material_select();
    }

  render() {
    return (
        <div className="container white z-depth-2">
            <div className="row center spacer">
                <h1 className="">Register</h1>
                <div className="col s12">
                <div className="card blue lighten-1 center">
                    <div className="card-content white-text">
                    
                    <p className="flow-text">Welcome to the Jailbreak Raffle Decentralized Application (dApp)!</p>
                    <p className="flow-text spacer">Please register for tickets to enter into the Raffle, the more information you provide, the more tickets you recieve.</p>
                    </div>
                </div>
                </div>
            </div>
              <div className="row">
                <form className="col offset-s1 s10" onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="input-field col s6">
                    <input id="first_name" type="text" className="validate" required />
                    <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                    <input id="last_name" type="text" className="validate" />
                    <label htmlFor="last_name">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="username" type="text" className="validate" required />
                    <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" className="validate" required />
                    <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                    <input id="company" type="text" className="validate" />
                    <label htmlFor="compnay">Your Company</label>
                    </div>
                    <div className="input-field col s6">
                    <input id="phone" type="text" className="validate" />
                    <label htmlFor="phone">Phone Number</label>
                    </div>
                </div>
                <div className="row">
                     <div className="input-field col s12">
                        <select className="browser-default" id="reason">
                            <option value='' disabled selected="selected">How did you hear about this?</option>
                            <option value="Cyberwire Podcast">Cyberwire</option>
                            <option value="The Bitcoin Podcast">The Bitcoin Podcast</option>
                            <option value="Novetta">Novetta</option>
                            <option value="Stumbled in">Stumbled into here</option>
                        </select>
                        <label htmlFor="reason" />
                    </div>
                </div>
                 
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" required />
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="confirmPassword" type="password" className="validate" required />
                    <label htmlFor="confirmPassword"> ConfirmPassword</label>
                    </div>
                </div>
                <div className="row center">
                    <button className="waves-effect waves-light btn btc-block blue lighten-1">Register</button>
                </div>
                </form>
            </div>
                       
        </div>
    );
  }
}

export default withRouter(Register);