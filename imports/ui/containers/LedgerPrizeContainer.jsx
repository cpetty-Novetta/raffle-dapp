import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class LedgerPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.ledgerContractState[0].currentStage == "Disbursed" ? 
                        this.props.ledgerRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default LedgerPrizeContainer;


