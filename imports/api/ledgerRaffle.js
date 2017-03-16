import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const LedgerRegisteredTickets = new Mongo.Collection('ledgerRegisteredTickets');
export const LedgerContractState = new Mongo.Collection('ledgerContractState');

// var RaffleWeb3 = web3.eth.contract(contract_abi);
// RaffleWeb3Instance = RaffleWeb3.at(contract_address);

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('ledgerContractState', function ledgerContractStatePublication() {
         return LedgerContractState.find({_id: "contractState"})
     })
     Meteor.publish('ledgerRegisteredTickets', function ledgerRegisteredTicketsPublication() {
         return LedgerRegisteredTickets.find();
     });

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    LedgerContractState.allow({
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

    var ledgerEvents = RaffleWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    ledgerEvents.watch( Meteor.bindEnvironment(function( err, result ) {
    if (err) {
        console.log(err);
    }
    // uncomment lower line to see all events as they happen
    // console.log(result)
    // add the transaction to our RegisterEvents collection
        if(result['event'] == 'ticketRegistered') {
            const address = result.args._address.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            const username = result.args._username.valueOf();
            const numTicketsTotal = result.args._numTicketsTotal.valueOf();
            const numUsersTotal = result.args._numUsersTotal.valueOf();
            console.log("Adding Ledger ticket", ticketId, " to the database");
            
            LedgerRegisteredTickets.update(
                ticketId, 
                { address: address,
                  username: username },
                { upsert: true }
            )
            LedgerContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            LedgerContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set ledger contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            LedgerRegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon, winner: true } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        } else if (result['event'] == "raffleInitiated") {
            const prizeName = result.args._prizeName.valueOf();
            const numPrizes = result.args._numPrizes.valueOf();
            LedgerContractState.update(
                'constractState',
                { $set: { 
                    prizeName: prizeName,
                    numPrizes: numPrizes,
                }}
            )
            console.log('recording ledger raffle initiation state')
        }

    }))
}

Meteor.methods({
    'updateLedgerStage'() {
        RaffleWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage) {
            LedgerContractState.update('contractState',
                { $set: { currentStage: stages[stage.valueOf()]} }
            )
        }))
    }
})
