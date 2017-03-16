import React, { Component } from 'react';

export default class RaffleStats extends Component {
    render() {
        let myLedgerTickets = this.props.ledgerRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myTshirtTickets = this.props.tshirtRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        return (
            <div className="section">
                <div className="row" >
                    <h4 className="center">Raffle Current Stage: {this.props.ledgerContractState[0].currentStage}</h4>
                    <div className="divider" />
                    <h4>Raffle Prize Statistics:</h4>
                    <div className="col s12"><h5>{this.props.ledgerContractState[0].numPrizes}x Ledger Nano:</h5></div>
                    <div className="col s8">
                        <p className="flow-text"> 
                            {this.props.ledgerContractState[0].numUsersTotal ? 
                            this.props.ledgerContractState[0].numUsersTotal : 0} total user(s) for {this.props.ledgerContractState[0].numTicketsTotal ?
                            this.props.ledgerContractState[0].numTicketsTotal : 0} tickets 
                        </p>
                    </div>
                    <div className="col s4"><p className="flow-text">Your tickets: {this.props.ledgerRegisteredTickets ?
                        myLedgerTickets.length : 0}</p></div>
                        <div className="col s12"><h5>{this.props.tshirtContractState[0].numPrizes}x Tshirts:</h5></div>
                    <div className="col s8">
                        <p className="flow-text"> 
                            {this.props.tshirtContractState[0].numUsersTotal ? 
                            this.props.tshirtContractState[0].numUsersTotal : 0} total user(s) for {this.props.tshirtContractState[0].numTicketsTotal ?
                            this.props.tshirtContractState[0].numTicketsTotal : 0} tickets 
                        </p>
                    </div>
                    <div className="col s4"><p className="flow-text">Your tickets: {this.props.ledgerRegisteredTickets ?
                        myTshirtTickets.length : 0}</p>
                    </div>
                </div>
            </div>
        )
    }
}
