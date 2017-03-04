import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const RegisteredUsers = new Mongo.Collection('registeredUsers');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to current user
    Meteor.publish('registeredUsers', function registeredUsersPublication() {
            return RegisteredUsers.find(
                {_id: this.userId},
                {fields: {
                    'account': 1, 
                    'createdAt': 1,
                    'registered': 1,
                    'company': 1,
                    'reason': 1,
                    'email': 1, 
                    'username': 1,
                    '_id': 1,
                }});
            // console.log(this.userId);
            // return RegisteredUsers.find();
    });
    Meteor.publish('other-user-data', function otheUserDataPublication() {
        return Meteor.users.find(
            {_id: this.userId},
            {fields: {
                account: 1,
                company: 1,
                reason: 1,
                seed: 1,
                isFunded: 1,
                registered: 1,
            }}
        )
    })
}

Meteor.methods({
    'user.insertUser'(userId) {
        check(userId, String);

        Meteor.users.update(userId, {
            $set: {
                company: '',
                reason: '',
            }
        })
        console.log("Inserted new user: ", userId);
    },
    'user.updateAddress'(userId, addr) {
        check(userId, String);
        check(addr, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // RegisteredUsers.update(userId, {
        //     $set: { account: addr } 
        // });  
        Meteor.users.update(userId, {
            $set: { account: addr } 
        });
        console.log('Updated Ethereum Address to ', addr);
    },
    'user.updateSeed'(userId, seed) {
        check(userId, String);
        check(seed, String);

        Meteor.users.update(userId, { $set: { seed: seed } });
        console.log('updated user ', userId, ' to seed: ', seed);
    },
    'user.updateCompany'(userId, company) {
        check(userId, String);
        check(company, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // RegisteredUsers.update(userId, { $set: { company: company } });   
        Meteor.users.update(userId, { $set: { company: company } });   
        console.log('Updated user company text to ', company);
    },
    'user.updateReason'(userId, reason) {
        check(userId, String);
        check(reason, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // RegisteredUsers.update(userId, { $set: { reason: reason } });  
        Meteor.users.update(userId, { $set: { reason: reason } });   
        console.log('Updated user reason text to ', reason)
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
        console.log('Updated users ', registeredItem, ' text to ', registeredValue );
    },
    'admin.fundAddress'(userId, addr) {
        check(addr, String);

        // if (! this.isFunded) {
        web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: addr,
            value: web3.toWei(1,'ether')
        }, function(err, result) {
            if (err) throw err;

            console.log("Funded new user with ETH for transactions");
            
        });
        // }

        Meteor.users.update(userId, { $set: { isFunded: true } });
    }

});