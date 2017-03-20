import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class GraphBookPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.graphBookContractState[0].currentStage == "Disbursed" ? 
                        this.props.graphBookRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default GraphBookPrizeContainer;


