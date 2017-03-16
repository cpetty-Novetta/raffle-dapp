var StandardToken = artifacts.require("./StandardToken.sol");
var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");
var Jailbreak = artifacts.require("./JailbreakRaffle.sol");
let Raffle = artifacts.require('./Raffle.sol');
let RaffleTshirt = artifacts.require('./RaffleTshirt.sol');

const prizes = {
  tshirt: {
    name: 'Novetta T-shirt',
    number: 1,
  },
  ledger: {
    name: 'Ledger Nano',
    number: 1,
  },
  bitcoinBook: {
    name: 'Mastering Bitcoin book',
    number: 1,
  },
  graphBook: {
    name: 'Graph Databases book',
    number: 1,
  },
  notebook: {
    name: 'Notebook',
    number: 1,
  },
}

module.exports = function(deployer) {
  // deployer.deploy(StandardToken);
  // deployer.link(StandardToken, HumanStandardToken);
  // deployer.deploy(HumanStandardToken);
  // deployer.link(HumanStandardToken, Jailbreak);
  // deployer.deploy(Jailbreak, initialAmount, tokenName, numDecimals, tokenSymbol);
  
  // deployer.deploy(Jailbreak);
  deployer.deploy(RaffleTshirt, prizes.tshirt.name, prizes.tshirt.number);
  deployer.deploy(Raffle, prizes.ledger.name, prizes.ledger.number);
  // deployer.deploy(Raffle, prizes.bitcoinBook.name, prizes.bitcoinBook.number);
  // deployer.deploy(Raffle, prizes.graphBook.name, prizes.graphBook.number);
  // deployer.deploy(Raffle, prizes.notebook.name, prizes.notebook.number);
};
