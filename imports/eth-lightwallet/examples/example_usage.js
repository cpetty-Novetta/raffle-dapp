var lightwallet = require('../index.js')
var keystore = lightwallet.keystore
var txutils = lightwallet.txutils
var signing = lightwallet.signing
var encryption = lightwallet.encryption

var RaffleJSON = require('../../smart-contracts/build/contracts/jailbreakraffle.json');
var contract_abi = RaffleJSON["abi"];
var unlinked_binary = RaffleJSON["unlinked_binary"];
var contract_address = RaffleJSON["networks"]["1900"].address;

var secretSeed = keystore.generateRandomSeed();
keystore.deriveKeyFromPassword('mypassword', function(err, pwDerivedKey) {
    if (err) throw err;
    var ks = new keystore(secretSeed, pwDerivedKey);
    ks.generateNewAddress(pwDerivedKey, 1);
    var addresses = ks.getAddresses();
    ks.passwordProvider = function(callback) {
        var pw = 'mypassword';
        callback(null, pw);
    }
    // addr = '0x' + addresses[0].valueOf();
    var sendingAddr = addresses[0]

    var nonce = 2

    // The transaction data follows the format of ethereumjs-tx
    txOptions = {
        gasPrice: 10000000000000,
        gasLimit: 3000000,
        value: 10000000,
        nonce: nonce,
        data: code
    }

    // sendingAddr is needed to compute the contract address
    var contractData = txutils.createContractTx(sendingAddr, txOptions)
    var signedTx = signing.signTx(ks, pwDerivedKey, contractData.tx, sendingAddr)

    console.log('Signed Contract creation TX: ' + signedTx)
    console.log('')
    console.log('Contract Address: ' + contractData.addr)
    console.log('')

    // TX to register the key 123
// txOptions.to = contractData.addr
// txOptions.nonce += 1
// var registerTx = txutils.functionTx(abi, 'register', [123], txOptions)
// var signedRegisterTx = signing.signTx(ks, pwDerivedKey, registerTx, sendingAddr)

// // inject signedRegisterTx into the network...
// console.log('Signed register key TX: ' + signedRegisterTx)
// console.log('')

// TX to set the value corresponding to key 123 to 456
txOptions.nonce += 1
var setValueTx = txutils.functionTx(contract_abi, 'registerTicketsToUser', , txOptions)
var signedSetValueTx = signing.signTx(ks, pwDerivedKey, setValueTx, sendingAddr)

// inject signedSetValueTx into the network...
console.log('Signed setValueTx: ' + signedSetValueTx)
console.log('')

});