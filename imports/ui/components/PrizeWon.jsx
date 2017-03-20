import React, { Component } from 'react';

export default class PrizeWon extends Component {
    render() {
        if (this.props.currentUser.account == this.props.address){ 
            if (this.props.winner) {
                return (
                    <p className="flow-text green-text">You won a {this.props.prize} from ticket number {this.props._id}!</p>
                )
            } else {
                return (null);
            }
        
        }
        else {
            return null
        }
    }
}