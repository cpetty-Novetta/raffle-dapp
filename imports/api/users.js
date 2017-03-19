import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('other-user-data', function otheUserDataPublication() {
        return Meteor.users.find(
            {_id: this.userId},
            {fields: {
                account: 1,
                name: 1,
                company: 1,
                reason: 1,
                phone: 1,
                seed: 1,
                privKey: 1,
                isFunded: 1,
                isRegistered: 1,
                numTicketsRegistered: 1,
                numEarnedTickets: 1,
                earnedAllTickets: 1,
                nonce: 1,
                isMining: 1,
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
    'user.updateName'(userId, name) {
        check(userId, String);
        check(name, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { name: name} });
    },
    'user.updateAddress'(userId, addr) {
        check(userId, String);
        check(addr, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, {
            $set: { account: addr } 
        });
        console.log('Updated Ethereum Address to ', addr);
    },
    'user.updatePrivKey'(userId, privKey) {
        check(userId, String);
        check(privKey, String);

        Meteor.users.update(userId, { $set: { privKey: privKey } });
        console.log('updated user ', userId, ' to privKey: ', privKey);
    },
    'user.updateCompany'(userId, company) {
        check(userId, String);
        check(company, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { company: company } });   
        console.log('Updated user company text to ', company);
    },
    'user.updateReason'(userId, reason) {
        check(userId, String);
        check(reason, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { reason: reason } });   
        console.log('Updated user reason text to ', reason)
    },
    'user.updatePhone'(userId, phone) {
        check(userId, String);
        check(phone, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: { phone: phone } });
        console.log("Added phone number to user ", userId);
    },
    'user.updateEarnedTickets'(userId, numTickets) {
        check(userId, String);
        check(numTickets, Number);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let earnedAllTickets;
        if (numTickets === 6) {
            earnedAllTickets = true;
        } else {
            earnedAllTickets = false;
        }

        Meteor.users.update(userId, { $set: { 
            numEarnedTickets: numTickets,
            earnedAllTickets: earnedAllTickets,
        } });
        console.log("Updated user ", userId, " to ", numTickets, " earned tickets.");
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
    'user.updateTicketsRegistered'(userId, numTickets) {
        check(userId, String);
        check(numTickets, Number);

        Meteor.users.update(userId, { $set: { numTicketsRegistered: numTickets } })
        console.log(numTickets, " total registered to smart contracts by user ", userId);
    },
    'user.increaseNonce'(userId, nonce) {
        Meteor.users.update(userId, { $set: { nonce: nonce + 1 } },
            {upsert: true})

        return nonce + 1;
    },
    'user.isMining'(userId, isMining) {
        check(userId, String);
        check(isMining, Boolean);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Meteor.users.update(userId, { $set: {isMining: isMining} })
    },
    'admin.fundAddress'(userId, addr) {
        check(addr, String);

        web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: addr,
            value: web3.toWei(1,'ether')
        }, Meteor.bindEnvironment(function(err, hash) {
            if (err) {
                console.log(err);
            } else {
                Meteor.users.update(userId,
                    { $set: { isMining: true } },
                    { upsert: true}
                )
                web3.eth.getTransactionReceiptMined(hash)
                .then(function(receipt) {
                    Meteor.users.update(userId, { $set: { isFunded: true, isMining: false } });
                    console.log("Funded new user with ETH for transactions");
                })
            }
        }));

        
    },
    'sendVerificationLink'(userId) {
        check(userId, String)
        if (Meteor.userId() !== userId) {
            throw new Meteor.error('not-authorized');
        }

        return Accounts.sendVerificationEmail( userId );
    }

});