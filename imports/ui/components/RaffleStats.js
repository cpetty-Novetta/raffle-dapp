import React, { Component } from 'react';

export default class RaffleStats extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fundAmount: 0,
            numUsers: 0,
            numTickets: 0,
        };
    }

    getNumUsers () {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getNumUsers();
        }).then((result) => {
            this.setState({
                numUsers: result.c[0],
            });
        })
    }

    getNumTickets () {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getNumTickets();
        }).then((result) => {
            this.setState({
                numTickets: result.valueOf(),
            });
        })
    }

    getFundAmount () {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getFundBalance();
        }).then((result) => {
            this.setState({
                fundAmount: result.valueOf(),
            });
        })
    }

    componentWillMount() {
        this.getFundAmount();
        this.getNumUsers();
        this.getNumTickets();
    }
 
    render() {
        
        return (
            <container className="raffle-stats">
                <div className="fund-amount" >
                    <h2>Fund Amount: {this.state.fundAmount}</h2>
                    <h2>Number Users: {this.state.numUsers}</h2>
                    <h2>Number Tickets: {this.state.numTickets}</h2>
                </div>
            </container>
        )
    }

}
