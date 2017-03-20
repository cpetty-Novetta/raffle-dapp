import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class BitcoinBookPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.bitcoinBookContractState[0].currentStage == "Disbursed" ? 
                        this.props.bitcoinBookRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default BitcoinBookPrizeContainer;


