import { default as Web3 } from 'web3';
EthereumAbi = require('ethereumjs-abi');
walletjs = require("ethereumjs-wallet");
EthereumTx = require("ethereumjs-tx");

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var json = require("/imports/smart-contracts/build/contracts/Raffle.json");
contract_abi = json["abi"];
unlinked_binary = json["unlinked_binary"];
contract_address = json["networks"]["1900"].address

RaffleWeb3 = web3.eth.contract(contract_abi);
RaffleWeb3Instance = RaffleWeb3.at(contract_address);

var tshirt_json = require("/imports/smart-contracts/build/contracts/RaffleTshirt.json");
tshirt_abi = tshirt_json['abi'];
tshirt_binary = tshirt_json["unlinked_binary"];
tshirt_address = tshirt_json["networks"]["1900"].address

TshirtWeb3 = web3.eth.contract(tshirt_abi);
TshirtWeb3Instance = TshirtWeb3.at(tshirt_address);
