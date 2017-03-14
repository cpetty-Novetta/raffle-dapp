import React, { Component } from 'react';

export default class RaffleStats extends Component {
    render() {
        return (
            <container className="raffle-stats">
                <div className="fund-amount" >
                    <h4>Current Stage: {this.props.contractState[0].currentStage}</h4>
                    <h4>Number Users: {this.props.contractState[0].numUsersTotal}</h4>
                    <h4>Number Tickets: {this.props.contractState[0].numTicketsTotal}</h4>
                </div>
            </container>
        )
    }
}
