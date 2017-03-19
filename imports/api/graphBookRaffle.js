import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const GraphBookRegisteredTickets = new Mongo.Collection('graphBookRegisteredTickets');
export const GraphBookContractState = new Mongo.Collection('graphBookContractState');

// Constructor parameters
const prizeName = 'graphBook';
const numPrizes = 5;

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('graphBookContractState', function graphBookContractStatePublication() {
         return GraphBookContractState.find({_id: "contractState"})
     })
     Meteor.publish('graphBookRegisteredTickets', function graphBookRegisteredTicketsPublication() {
         return GraphBookRegisteredTickets.find();
     });
     

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    GraphBookContractState.allow({
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

    var graphBookEvents = GraphBookWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    graphBookEvents.watch( Meteor.bindEnvironment(function( err, result ) {
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
            console.log("Adding GraphBook ticket", ticketId, " to the database");
            
            GraphBookRegisteredTickets.update(
                ticketId, 
                { address: address,
                username: username },
                { upsert: true }
            )
            GraphBookContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                    address: graphBook_address,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            GraphBookContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set GraphBook contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            GraphBookRegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon, winner: true } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        } else if (result['event'] == "raffleInitiated") {
            const prizeName = result.args._prizeName.valueOf();
            const numPrizes = result.args._numPrizes.valueOf();
            GraphBookContractState.update(
                'constractState',
                { $set: { 
                    prizeName: prizeName,
                    numPrizes: numPrizes,
                }}
            )
            console.log('recording graphBook raffle initiation state')
        }
    }));
}

Meteor.methods({
   'updateGraphBookStage'() {
       GraphBookWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage) {
            GraphBookContractState.update('contractState',
                { $set: { currentStage: stages[stage.valueOf()]} }
            )
        }))
   }
})
