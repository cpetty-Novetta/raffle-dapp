var account_1 = '0xe19b4016f16f67debcf8b23378c14f6edc37d858';
var account_2 = '0xff60ab209b9b9d8435caa87c2a50ac443b71e8d6';
var jailbreakraffle = artifacts.require("./jailbreakraffle.sol");

var raffle;

module.exports = function(callback) {
  jailbreakraffle.deployed().then(function(instance) {
    raffle = instance;
    return raffle.getNumUsers.call( {from: account_1});
  }).then(function(num_users) {
    console.log(num_users);
  }).catch(function(e) {
    console.log("there was an error ", e);
  });

  console.log('ran correctly');
}
