import React, { Component } from 'react';

export default class RaffleStats extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            numUsers: 0,
            numTickets: 0,
        };

        this.getNumTickets.bind(this);
        this.getNumUsers.bind(this);
    }

    // This should be relegated to the server
    getNumUsers () {
    }

    // This should be relegated to the server
    getNumTickets () {
    }

    componentDidMount() {
        const refreshStats = () => {
            this.getNumUsers();
            this.getNumTickets();
        }

        this.refreshInterval = setInterval(() => {
            refreshStats();
            return refreshStats
        }, 5000)

    }
 
    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    render() {
        
        return (
            <container className="raffle-stats">
                <div className="fund-amount" >
                    <h4>Number Users: {this.state.numUsers}</h4>
                    <h4>Number Tickets: {this.state.numTickets}</h4>
                </div>
            </container>
        )
    }

}
