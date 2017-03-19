import React, { Component } from 'react';

import PrizeStats from '/imports/ui/components/PrizeStats';

export default class RaffleStats extends Component {
    render() {
        let myLedgerTickets = this.props.ledgerRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myTshirtTickets = this.props.tshirtRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myGraphBookTickets = this.props.graphBookRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myDappBookTickets = this.props.dappBookRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myInternetBookTickets = this.props.internetBookRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myBitcoinBookTickets = this.props.bitcoinBookRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        let myMakersBookTickets = this.props.makersBookRegisteredTickets.filter((ticket) => {
            if(ticket.address == this.props.currentUser.account) return ticket;
        })
        return (
            <div className="section">
                <div className="row" >
                    <h4 className="center">Raffle Current Stage: <span className="blue-text lighten-1">{this.props.ledgerContractState[0].currentStage}</span></h4>
                    {/*<div className="divider" />
                    <h4 className="center">Raffle Prize Statistics:</h4>*/}
                    <table>
                        <thead>
                            <tr>
                                <th data-field="prizeName">Prize</th>
                                <th data-field="numPrizes"># Prizes</th>
                                <th data-field="numUsers"># Users</th>
                                <th data-field="numTickets"># Tickets</th>
                                <th data-field="yourRegistered">Your Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            <PrizeStats
                                myTickets={myLedgerTickets}
                                contractState={this.props.ledgerContractState[0]}
                            />
                            <PrizeStats
                                myTickets={myTshirtTickets}
                                contractState={this.props.tshirtContractState[0]}
                            />
                            <PrizeStats
                                myTickets={myBitcoinBookTickets}
                                contractState={this.props.bitcoinBookContractState[0]}
                            /> 
                            <PrizeStats
                                myTickets={myGraphBookTickets}
                                contractState={this.props.graphBookContractState[0]}
                            /> 
                            <PrizeStats
                                myTickets={myDappBookTickets}
                                contractState={this.props.dappBookContractState[0]}
                            /> 
                            <PrizeStats
                                myTickets={myInternetBookTickets}
                                contractState={this.props.internetBookContractState[0]}
                            /> 
                            <PrizeStats
                                myTickets={myMakersBookTickets}
                                contractState={this.props.makersBookContractState[0]}
                            /> 
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
