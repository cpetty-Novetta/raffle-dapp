import { default as Web3 } from 'web3';
EthereumAbi = require('ethereumjs-abi');
 walletjs = require("ethereumjs-wallet");
 EthereumTx = require("ethereumjs-tx");

var json = require("/imports/smart-contracts/build/contracts/JailbreakRaffle.json");
contract_abi = json["abi"];
var unlinked_binary = json["unlinked_binary"];
contract_address = json["networks"]["1900"].address

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.getAccounts((err, accs) => {
    if (err != null) {
        // alert("There was an error fething accounts.");
        return;
    }

    if (accs.length == 0)  {
        // alert("Couldn't get any accounts! Make sure Ethereum client is running.")
    }

    accounts = accs;
    coinbase = accs[0];
})

RaffleWeb3 = web3.eth.contract(contract_abi);
RaffleWeb3Instance = RaffleWeb3.at(contract_address);