import React, { Component } from 'react';

export default class PrizeWon extends Component {
    render() {
        if (this.props.currentUser.account == this.props.address){ 
            return (
                <p className="flow-text">Ticket Number {this.props._id} won: {this.props.prize}!</p>
            )
        }
        else {
            return null
        }
    }
}