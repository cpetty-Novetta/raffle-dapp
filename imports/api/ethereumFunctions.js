import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const RegisteredTickets = new Mongo.Collection('raffleRegisteredTickets');
var RaffleWeb3 = web3.eth.contract(contract_abi);
RaffleWeb3Instance = RaffleWeb3.at(contract_address);

if (Meteor.isServer) {
     Meteor.publish('raffleRegisteredTickets', function raffleRegisteredTicketsPublication() {
            return RegisteredTickets.find();
     });

     var events = RaffleWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
        events.watch( Meteor.bindEnvironment(function( err, result ) {
        if (err) {
            console.log(err);
        }
        // put into db
        console.log(result);
        // add the transaction to our RegisterEvents collection
            if(result['event'] == 'ticketRegistered') {
                const address = result.args._address.valueOf();
                const ticketId = result.args._ticketId.valueOf();
                console.log("Adding ", ticketId, " to the database");
                
                RegisteredTickets.update(
                    ticketId, 
                    { address: address },
                    { upsert: true }
                )
            }

    }))
}
