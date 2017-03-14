import { default as Web3 } from 'web3';
EthereumAbi = require('ethereumjs-abi');
walletjs = require("ethereumjs-wallet");
EthereumTx = require("ethereumjs-tx");

var json = require("/imports/smart-contracts/build/contracts/JailbreakRaffle.json");
contract_abi = json["abi"];
contract_address = json["networks"]["1900"].address;

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var RaffleWeb3 = web3.eth.contract(contract_abi);
RaffleWeb3Instance = RaffleWeb3.at(contract_address);

RaffleWeb3Instance.getNumUsers((err, data) => {
    console.log("the data is: ", data.valueOf())
})