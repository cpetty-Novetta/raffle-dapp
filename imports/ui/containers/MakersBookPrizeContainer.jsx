import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class MakersBookPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.makersBookContractState[0].currentStage == "Disbursed" ? 
                        this.props.makersBookRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default MakersBookPrizeContainer;


