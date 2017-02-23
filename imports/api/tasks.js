import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
export const Tickets = new Mongo.Collection('tickets');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });

    Meteor.publish('tickets', function ticketsPublication() {
        return Tickets.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a tasks
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String) 
        
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only owner can check it
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
    'ticket.register'(userCompany, userReason) {
        check(userCompany, String);
        check(userReason, String);

        if (! this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Tickets.insert({
            company: userCompany,
            reason: userReason,
            createdAt:  new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'admin.fundAddress'(addr) {
        check(addr, String);

        web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: addr,
            value: web3.toWei(1,'ether')
        }, function(err, result) {
            if (err) throw err;

            web3.eth.getBalance(addr, function(err, balance) {
                console.log("Current Balance: ", balance);
            });
        });

    }

});