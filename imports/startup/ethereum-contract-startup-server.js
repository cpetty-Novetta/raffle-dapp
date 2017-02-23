import { default as Web3 } from 'web3';

var json = require("/imports/smart-contracts/build/contracts/JailbreakRaffle.json");
var contract_abi = json["abi"];
var unlinked_binary = json["unlinked_binary"];
contract_address = '0xd2e67ec656c8eadf3624c5a2f25b621ba019a597';


// contract_address = json["networks"]["1000"]["address"];
// var MyContract = web3.eth.contract(contract_abi);
// raffle = MyContract.at(contract_address);
// var result = raffle.getFundBalance()
// console.log(result)

// var contract = require("truffle-contract");
// Raffle = contract(json);

// Raffle.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.getAccounts((err, accs) => {
    if (err != null) {
        alert("There was an error fething accounts.");
        return;
    }

    if (accs.length == 0)  {
        alert("Couldn't get any accounts! Make sure Ethereum client is running.")
    }

    accounts = accs;
    coinbase = accs[0];
})