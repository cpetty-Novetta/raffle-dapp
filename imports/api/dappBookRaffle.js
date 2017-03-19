import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const DappBookRegisteredTickets = new Mongo.Collection('dappBookRegisteredTickets');
export const DappBookContractState = new Mongo.Collection('dappBookContractState');

// Constructor parameters
const prizeName = 'dappBook';
const numPrizes = 5;

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('dappBookContractState', function dappBookContractStatePublication() {
         return DappBookContractState.find({_id: "contractState"})
     })
     Meteor.publish('dappBookRegisteredTickets', function dappBookRegisteredTicketsPublication() {
         return DappBookRegisteredTickets.find();
     });
     

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    DappBookContractState.allow({
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

    var dappBookEvents = DappBookWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    dappBookEvents.watch( Meteor.bindEnvironment(function( err, result ) {
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
            console.log("Adding DappBook ticket", ticketId, " to the database");
            
            DappBookRegisteredTickets.update(
                ticketId, 
                { address: address,
                username: username },
                { upsert: true }
            )
            DappBookContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                    address: dappBook_address,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            DappBookContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set DappBook contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            DappBookRegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon, winner: true } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        } else if (result['event'] == "raffleInitiated") {
            const prizeName = result.args._prizeName.valueOf();
            const numPrizes = result.args._numPrizes.valueOf();
            DappBookContractState.update(
                'constractState',
                { $set: { 
                    prizeName: prizeName,
                    numPrizes: numPrizes,
                }}
            )
            console.log('recording dappBook raffle initiation state')
        }
    }));
}

Meteor.methods({
   'updateDappBookStage'() {
       DappBookWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage) {
            DappBookContractState.update('contractState',
                { $set: { currentStage: stages[stage.valueOf()]} }
            )
        }))
   }
})
