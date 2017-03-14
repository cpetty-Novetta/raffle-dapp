import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const RegisteredTickets = new Mongo.Collection('raffleRegisteredTickets');
export const ContractState = new Mongo.Collection('raffleContractState');

var RaffleWeb3 = web3.eth.contract(contract_abi);
RaffleWeb3Instance = RaffleWeb3.at(contract_address);

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('raffleContractState', function raffleContractStatePublication() {
         return contractState = ContractState.find({_id: "contractState"})
     })
     Meteor.publish('raffleRegisteredTickets', function raffleRegisteredTicketsPublication() {
         return RegisteredTickets.find();
     });

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    ContractState.allow({
        insert: function(userId, lugar){
            return adminUser(userId);
        },
        update: function(userId, lugares, fields, modifier){
            return adminUser(userId);
        },
        remove: function (userId, docs){
            return adminUser(userId);
        }
    });

    var events = RaffleWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    events.watch( Meteor.bindEnvironment(function( err, result ) {
    if (err) {
        console.log(err);
    }
    // add the transaction to our RegisterEvents collection
        if(result['event'] == 'ticketRegistered') {
            const address = result.args._address.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            const numTicketsTotal = result.args._numTicketsTotal.valueOf();
            const numUsersTotal = result.args._numUsersTotal.valueOf();
            console.log("Adding ", ticketId, " to the database");
            
            RegisteredTickets.update(
                ticketId, 
                { address: address },
                { upsert: true }
            )
            ContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            ContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            RegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        }

    }))
}

Meteor.methods({
    'updateStage'() {
        RaffleWeb3Instance.getStage.call(function(err, stage) {
            console.log(stage.valueOf())
        })
    }
})
