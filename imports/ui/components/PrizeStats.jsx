import React, { Component, PropTypes } from 'react';

const PrizeStats = (props) =>  {
        return (
            <tr>
                <td>{props.contractState.prizeName}</td>
                <td>{props.contractState.numPrizes}</td>
                <td>{props.contractState.numUsersTotal ? 
                        props.contractState.numUsersTotal : 0}</td>
                <td>{props.contractState.numTicketsTotal ?
                        props.contractState.numTicketsTotal : 0}</td>
                <td><p className="blue-text lighten-1">{props.myTickets ?
                        props.myTickets.length : 0}</p></td>
            </tr>
        );
    
}

export default PrizeStats;

