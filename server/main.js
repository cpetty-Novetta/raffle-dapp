import { Meteor } from 'meteor/meteor';
import '/imports/startup/ethereum-contract-startup-server';
import { Session } from 'meteor/session';

import '/imports/api/users.js';
import '/imports/api/ethereumFunctions.js';



Meteor.startup(() => {
  // code to run on server at startup
    getNumUsers = () => {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getNumUsers();
        }).then((result) => {
            RaffleContractState.update(
              'state',
              { $set: 
                {
                  numUsersTotal: result.valueOf(),
                }
              },
              { upsert: true}
            )
        })
    }

    getNumTickets = () => {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getNumTickets();
        }).then((result) => {
            RaffleContractState.update(
              'state',
              { $set: 
                {
                  numTicketsTotal: result.valueOf(),
                }
              },
              { upsert: true}
            )
        })
    }

    getFundAmount = () => {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return instance.getFundBalance();
        }).then((result) => {
            RaffleContractState.update(
              'state',
              { $set: 
                {
                  fundBalanceTotal: result.valueOf(),
                }
              },
              { upsert: true}
            )
        })
    }

    getCurrentStage = () => {
        var deployed;
        Raffle.deployed().then((instance) => {
            var deployed = instance;
            return deployed.getStage({from: coinbase});
        }).then((result) => {
            RaffleContractState.update(
              'state',
              { $set: 
                {
                  currentStage: result.valueOf(),
                }
              },
              { upsert: true}
            )
        });
    }

    setInterval(

    )
});
