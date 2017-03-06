import React from 'react';
import { withRouter } from 'react-router-dom';

// import './Register.scss';


class Register extends React.Component {
    constructor(props) {
        super(props);

    }

    handleSubmit(event) {
		event.preventDefault();
		var ele = $(event.target);

        var firstName = ele.find("#first_name").val();
        var lastName = ele.find("#last_name").val();
        var username = ele.find('#username').val();
		var email = ele.find("#email").val();
        var company = ele.find("#company").val();
        var reason = ele.find("#reason").val();
		var password = ele.find("#password").val();
		var confirmPassword = ele.find("#confirmPassword").val();
		if(password === confirmPassword && password !== "" && confirmPassword !== "") {
			var accountInfo = {
				email: email,
				password: password,
                username: username,
			};
			Accounts.createUser(accountInfo, (er) => {
				if(er) {
					Materialize.toast(er.reason, 4000);
				} else {
                    Session.set("loggedIn", true);
					Materialize.toast("You're logged in!", 4000);
                    this.props.history.push('/');
				}
			});
		} else {
			Materialize.toast('Your passwords dont match!', 4000);
		}
	}


  render() {
    var navStyle={
      backgroundColor: "#42a5f5", 
      paddingLeft: "12px"
    }
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
                    <input id="username" type="username" className="validate" />
                    <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" className="validate" />
                    <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="company" type="text" className="validate" />
                    <label htmlFor="compnay">Your Company</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="reason" type="text" className="validate" />
                    <label htmlFor="reason">Where did you hear about this?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="confirmPassword" type="password" className="validate" />
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