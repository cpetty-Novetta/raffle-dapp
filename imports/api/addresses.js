import { Meteor } from 'meteor/meteor';
import { keystore, txutils } from 'eth-lightwallet';


// var password = 'password'; //get password from currentUser

// keystore.createVault({
//     password: password,

//     }, function(err, ks) {
//     ks.keyFromPassword(password, function(err, pwDerivedKey) {
//         if (err) throw err;

//         ks.generateNewAddress(pwDerivedKey, 1);
//         var addr = ks.getAddresses();
//         console.log(addr.valueOf())
//     });
// });



