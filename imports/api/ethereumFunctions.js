import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const RaffleContractState = new Mongo.Collection('raffleContractState');

if (Meteor.isServer) {
     Meteor.publish('raffleContractState', function raffleContractStatePublication() {
            return RaffleContractState.find({});
     });
}