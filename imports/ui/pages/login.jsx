import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

// import './Register.scss';




class Login extends React.Component {
    // state = {
    //     redirectToRefferer: false,
    // }

    handleSubmit(event) {
        event.preventDefault();
        var ele = $(event.target);

        var email = ele.find("#email").val();
        var password = ele.find("#password").val();
        
        // Login user
        Meteor.loginWithPassword(email, password, (er) => {
            if (er) {
                Materialize.toast(er.reason, 4000);
            } else {
                this.props.history.push('/');
                Materialize.toast("You're logged in!", 4000);
            };
        })
        // this.setState({ redirectToRefferer: true });
        
        // console.log("handleSubmit: ", this.state.redirectToRefferer);
    }

    render () {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        // const { redirectToRefferer } = this.state
        return (
        <div className="container">
            <h4 className="text-center">Login</h4>
              <div className="row">
                <form className="col offset-s4 s4" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="password" type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>
        )
    }

}

Login.ContextTypes = {
    router: React.PropTypes.object
}


export default withRouter(Login);