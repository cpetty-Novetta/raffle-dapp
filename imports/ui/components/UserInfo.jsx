import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            // userAddress: '0xcc2cef4512d12679ba2e21bf1aed183ea4f2785a',
            userAddress: '0x0FA35114670859028Cd4398a59f2D391b7771bDe',  // Current MetaMask account
            userCompany: '',
            userReason: '',
            currentStage: '',
        };

        this.getUserInfo.bind(this);
    }

    getUserInfo() {
        var userAddress = this.state.userAddress;
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getUserInfo(userAddress, {from: coinbase});
        }).then((result) => {
            console.log(result[0].toNumber());
            console.log(result[1]);
        });
    }

    componentWillMount() {
        this.getUserInfo();
    }
 
    render() {
        
        return (
            <container className="container">
                <div className="user-info-div">
                    
                </div>
            </container>
        )
    }

}

UserInfo.PropTypes = {
    currentUser: PropTypes.object.isRequired,
}
