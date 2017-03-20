import React, { Component } from 'react';

import PrizeWon from '/imports/ui/components/PrizeWon';

class TbpTshirtPrizeContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.tbpTshirtContractState[0].currentStage == "Disbursed" ? 
                        this.props.tbpTshirtRegisteredTickets.map(ticket => (
                            <PrizeWon {...ticket} key={ticket._id} currentUser={this.props.currentUser} />
                        )) :
                        null
                }
            </div>
        );
    }
}

export default TbpTshirtPrizeContainer;


