import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const TshirtRegisteredTickets = new Mongo.Collection('tshirtRegisteredTickets');
export const TshirtContractState = new Mongo.Collection('tshirtContractState');

// Constructor parameters
const prizeName = 'tshirt';
const numPrizes = 5;

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('tshirtContractState', function tshirtContractStatePublication() {
         return TshirtContractState.find({_id: "contractState"})
     })
     Meteor.publish('tshirtRegisteredTickets', function tshirtRegisteredTicketsPublication() {
         return TshirtRegisteredTickets.find();
     });
     

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    TshirtContractState.allow({
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

    var tshirtEvents = TshirtWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    tshirtEvents.watch( Meteor.bindEnvironment(function( err, result ) {
    if (err) {
        console.log(err);
    }
    // uncomment to see raw events from watching
    // console.log(result)
        if(result['event'] == 'ticketRegistered') {
            const address = result.args._address.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            const username = result.args._username.valueOf();
            const numTicketsTotal = result.args._numTicketsTotal.valueOf();
            const numUsersTotal = result.args._numUsersTotal.valueOf();
            console.log("Adding Tshirt ticket", ticketId, " to the database");
            
            TshirtRegisteredTickets.update(
                ticketId, 
                { address: address,
                username: username },
                { upsert: true }
            )
            TshirtContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                    address: tshirt_address,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            TshirtContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set Tshirt contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            TshirtRegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon, winner: true } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        } else if (result['event'] == "raffleInitiated") {
            const prizeName = result.args._prizeName.valueOf();
            const numPrizes = result.args._numPrizes.valueOf();
            TshirtContractState.update(
                'constractState',
                { $set: { 
                    prizeName: prizeName,
                    numPrizes: numPrizes,
                }}
            )
            console.log('recording tshirt raffle initiation state')
        }
    }));
}

Meteor.methods({
   'updateTshirtStage'() {
       TshirtWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage) {
            TshirtContractState.update('contractState',
                { $set: { currentStage: stages[stage.valueOf()]} }
            )
        }))
   }
})
