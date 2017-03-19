import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotLoggedIn extends Component {
    handleRegisterPush() {
        this.props.history.push('/register');
    } 

    handleLoginPush() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <img className="responsive-img col s12" src="img/techtalks-marketo-promo.png"/>
                    <p className="flow-text text-center white-text">Please Login or Register</p>
                    <div className="center">
                        <div className="row">
                            <button className="btn blue lighten-1" onClick={this.handleRegisterPush.bind(this)}>Register</button>
                        </div>
                        <div className="row">
                            <button className="btn blue lighten-1" onClick={this.handleLoginPush.bind(this)}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NotLoggedIn)