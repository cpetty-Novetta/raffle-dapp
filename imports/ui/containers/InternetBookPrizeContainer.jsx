import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class InternetBookPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.internetBookContractState[0].currentStage == "Disbursed" ? 
                        this.props.internetBookRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default InternetBookPrizeContainer;


