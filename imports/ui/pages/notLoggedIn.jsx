import React, { Component } from 'react';

export default class NotLoggedIn extends Component {
    render() {
        return (
            <div className="section">
                <div className="row">
                <img className="responsive-img col s12" src="img/techtalks-marketo-promo.png"/>
                <p className="flow-text text-center floating">Please Login or Register</p>
                </div>
            </div>
        )
    }
}