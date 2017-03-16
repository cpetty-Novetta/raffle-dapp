import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class TshirtPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.tshirtContractState[0].currentStage == "Disbursed" ? 
                        this.props.tshirtRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default TshirtPrizeContainer;


