import React from 'react';
import { withRouter } from 'react-router-dom';
let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let PNF = require('google-libphonenumber').PhoneNumberFormat;

// import './Register.scss';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numTicketsToRegister: 0,
        }
    }

    countTicketsToRegister(company, reason, phone) {
        numTickets = 1;
        if (company !== '') {
            numTickets++;
        }
        if (reason !== '') {
            numTickets++;
        }
        if (phone !== '') {
            numTickets++;
        }
        this.setState({ numTicketsToRegister: numTickets});
    }

    verifyPhoneNumber(inputNumber) {
        try {
            const parsedNumber = phoneUtil.parse(inputNumber, "US")
            return phoneUtil.format(parsedNumber, PNF.INTERNATIONAL);
        }
        catch (e) {
            Materialize.toast("Phone number is ill-formatted, try again. \n Ex: 800-555-1000", 4000);
        }
    }

    handleSubmit(event) {
		event.preventDefault();
		var ele = $(event.target);

        var firstName = ele.find("#first_name").val();
        var lastName = ele.find("#last_name").val();
        let phone = ele.find('#phone').val();
        let formattedNumber = this.verifyPhoneNumber(phone);
        console.log(formattedNumber)
        var username = ele.find('#username').val();
		var email = ele.find("#email").val();
        var company = ele.find("#company").val();
        var reason = ele.find("#reason").val();
		var password = ele.find("#password").val();
		var confirmPassword = ele.find("#confirmPassword").val();
        if(formattedNumber === undefined) {
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
                    Meteor.call('user.updateCompany', Meteor.userId(), company);
                    Meteor.call('user.updateReason', Meteor.userId(), reason);
                    Meteor.call('user.updatePhone', Meteor.userId(), formattedNumber);
                    this.countTicketsToRegister(company, reason, formattedNumber);
                    Meteor.call('user.updateNumTickets', Meteor.userId(), this.state.numTicketsToRegister);
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
        <div className="container">
            <h4 className="text-center">Register</h4>
              <div className="row">
                <form className="col offset-s4 s4" onSubmit={this.handleSubmit.bind(this)}>
                <div className="row">
                    <div className="input-field col s6">
                    <input id="first_name" type="text" className="validate" />
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
                        <select id="reason" value=''>
                            <option value='' disabled>How did you hear about this?</option>
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
                <div className="row">
                    <button className="waves-effect waves-light btn btc-block">Register</button>
                </div>
                </form>
            </div>
                       
        </div>
    );
  }
}

export default withRouter(Register);