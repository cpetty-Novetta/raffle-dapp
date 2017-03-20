import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class DappBookPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.dappBookContractState[0].currentStage == "Disbursed" ? 
                        this.props.dappBookRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default DappBookPrizeContainer;


