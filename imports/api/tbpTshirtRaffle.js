import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const TbpTshirtRegisteredTickets = new Mongo.Collection('tbpTshirtRegisteredTickets');
export const TbpTshirtContractState = new Mongo.Collection('tbpTshirtContractState');

// Constructor parameters
const prizeName = 'tbpTshirt';
const numPrizes = 2;

const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}

if (Meteor.isServer) {
    // Publications to client
     Meteor.publish('tbpTshirtContractState', function tbpTshirtContractStatePublication() {
         return TbpTshirtContractState.find({_id: "contractState"})
     })
     Meteor.publish('tbpTshirtRegisteredTickets', function tshirtRegisteredTicketsPublication() {
         return TbpTshirtRegisteredTickets.find();
     });
     

    function adminUser(userId) {
        var adminUser = Meteor.users.findOne({username:"cpetty"});
        return (userId && adminUser && userId === adminUser._id);
    }

    TbpTshirtContractState.allow({
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

    var tbpTshirtEvents = TbpTshirtWeb3Instance.allEvents({from: 0, toBlock: 'latest'});
    tbpTshirtEvents.watch( Meteor.bindEnvironment(function( err, result ) {
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
            console.log("Adding TBP Tshirt ticket", ticketId, " to the database");
            
            TbpTshirtRegisteredTickets.update(
                ticketId, 
                { address: address,
                username: username },
                { upsert: true }
            )
            TbpTshirtContractState.update(
                'contractState',
                { $set: {
                    numTicketsTotal: numTicketsTotal,
                    numUsersTotal: numUsersTotal,
                    address: tbpTshirt_address,
                }},
                { upsert: true }
            )
        } else if (result['event'] == 'stageChanged') {
            const currentStage = stages[result.args._stage.valueOf()];
            TbpTshirtContractState.update(
                "contractState",
                { $set: { currentStage: currentStage }},
                {upsert: true}
            )
            console.log("Set TBP Tshirt contract stage to ", currentStage);
            
        } else if (result['event'] == 'prizeWon') {
            const prizeWon = result.args._prize.valueOf();
            const ticketId = result.args._ticketId.valueOf();
            TbpTshirtRegisteredTickets.update(
                ticketId,
                { $set: { prize: prizeWon, winner: true } }
            )
            console.log("ticket ", ticketId, " has won ", prizeWon);
        } else if (result['event'] == "raffleInitiated") {
            const prizeName = result.args._prizeName.valueOf();
            const numPrizes = result.args._numPrizes.valueOf();
            TbpTshirtContractState.update(
                'constractState',
                { $set: { 
                    prizeName: prizeName,
                    numPrizes: numPrizes,
                }}
            )
            console.log('recording TBP tshirt raffle initiation state')
        }
    }));
}

Meteor.methods({
   'updateTbpTshirtStage'() {
       TbpTshirtWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage) {
            TbpTshirtContractState.update('contractState',
                { $set: { currentStage: stages[stage.valueOf()]} }
            )
        }))
   }
})
