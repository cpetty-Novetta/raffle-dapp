import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to current user

    Meteor.publish('userData', function () {
        if (this.userId) {
            return Meteor.users.find(
                {_id: this.userId},
                {fields: {
                    'address': 1, 
                    'addressRegistered': 1,
                    'reasonRegistered': 1,
                    'companyRegistered': 1,
                    'registered': 1,
                }});
        } else {
            this.ready();
        }
    });
}

Meteor.methods({
    'user.insertAddress'(userId, addr) {
        check(userId, String);
        check(addr, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { 
            $set: { 
                address: addr,
                addressRegistered: true,
            } 
        });   
    },
    'user.insertCompany'(userId, company) {
        check(userId, String);
        check(company, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { companyRegistered: company } });   
    },
    'user.insertReason'(userId, reason) {
        check(userId, String);
        check(reason, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { reasonRegistered: reason } });   
    },
    'user.setRegistered'(userId, registeredItem, registeredValue) {
        check(userId, String);
        check(registeredItem, String);
        check(registeredValue, Boolean);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        var obj = {};
        obj[registeredItem] = registeredValue;
        Meteor.users.update(userId, { $set: obj });
    },

});