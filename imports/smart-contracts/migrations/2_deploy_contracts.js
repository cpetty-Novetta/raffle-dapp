var StandardToken = artifacts.require("./StandardToken.sol");
var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");
var Jailbreak = artifacts.require("./JailbreakRaffle.sol");
let RaffleLedger = artifacts.require('./RaffleLedger.sol');
let RaffleTshirt = artifacts.require('./RaffleTshirt.sol');
let RaffleGraphBook = artifacts.require('./RaffleGraphBook.sol');
let RaffleInternetBook = artifacts.require('./RaffleInternetBook.sol');
let RaffleDappBook = artifacts.require('./RaffleDappBook.sol');
let RaffleMakersBook = artifacts.require('./RaffleMakersBook.sol');
let RaffleBitcoinBook = artifacts.require('./RaffleBitcoinBook.sol');

const prizes = {
  tshirt: {
    name: 'Novetta T-shirt',
    number: 5,
  },
  ledger: {
    name: 'Ledger Nano',
    number: 1,
  },
  bitcoinBook: {
    name: 'Mastering Bitcoin book',
    number: 2,
  },
  graphBook: {
    name: 'Graph Databases book',
    number: 2,
  },
  makersBook: {
    name: 'Makers Notebook',
    number: 1,
  },
  dappBook: {
    name: 'Dentralized Applications book',
    number: 2,
  },
  internetBook: {
    name: 'Internet book',
    number: 2,
  },
}

module.exports = function(deployer) {
  deployer.deploy(RaffleTshirt, prizes.tshirt.name, prizes.tshirt.number);
  deployer.deploy(RaffleBitcoinBook, prizes.bitcoinBook.name, prizes.bitcoinBook.number);
  deployer.deploy(RaffleDappBook, prizes.dappBook.name, prizes.dappBook.number);
  deployer.deploy(RaffleGraphBook, prizes.graphBook.name, prizes.graphBook.number);
  deployer.deploy(RaffleInternetBook, prizes.internetBook.name, prizes.internetBook.number);
  deployer.deploy(RaffleMakersBook, prizes.makersBook.name, prizes.makersBook.number);
  deployer.deploy(RaffleLedger, prizes.ledger.name, prizes.ledger.number);
};
