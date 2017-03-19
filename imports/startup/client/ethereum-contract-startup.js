import { default as Web3 } from 'web3';
EthereumAbi = require('ethereumjs-abi');
walletjs = require("ethereumjs-wallet");
EthereumTx = require("ethereumjs-tx");

// web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.1.175:8545'));

// Taken from gist from xavierlepretre
// found here: https://gist.github.com/xavierlepretre/88682e871f4ad07be4534ae560692ee6
web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval = interval ? interval : 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        web3.eth.getTransactionReceipt(txnHash, (error, receipt) => {
            if (error) {
                reject(error);
            } else {
                if (receipt == null) {
                    setTimeout(function () {
                        transactionReceiptAsync(txnHash, resolve, reject);
                    }, interval);
                } else {
                    resolve(receipt);
                }
            }
        });
    };

    if (Array.isArray(txnHash)) {
        var promises = [];
        txnHash.forEach(function (oneTxHash) {
            promises.push(web3.eth.getTransactionReceiptMined(oneTxHash, interval));
        });
        return Promise.all(promises);
    } else {
        return new Promise(function (resolve, reject) {
                transactionReceiptAsync(txnHash, resolve, reject);
            });
    }
};


ledger_json = require("/imports/smart-contracts/build/contracts/RaffleLedger.json");
ledger_abi = ledger_json["abi"];
ledger_binary = ledger_json["unlinked_binary"];
ledger_address = ledger_json["networks"]["1900"].address;
let LedgerWeb3 = web3.eth.contract(ledger_abi);
LedgerWeb3Instance = LedgerWeb3.at(ledger_address);

tshirt_json = require("/imports/smart-contracts/build/contracts/RaffleTshirt.json");
tshirt_abi = tshirt_json['abi'];
tshirt_binary = tshirt_json["unlinked_binary"];
tshirt_address = tshirt_json["networks"]["1900"].address

let TshirtWeb3 = web3.eth.contract(tshirt_abi);
TshirtWeb3Instance = TshirtWeb3.at(tshirt_address);

bitcoinBook_json = require("/imports/smart-contracts/build/contracts/RaffleBitcoinBook.json");
bitcoinBook_abi = bitcoinBook_json['abi'];
bitcoinBook_binary = bitcoinBook_json["unlinked_binary"];
bitcoinBook_address = bitcoinBook_json["networks"]["1900"].address

let BitcoinBookWeb3 = web3.eth.contract(bitcoinBook_abi);
BitcoinBookWeb3Instance = BitcoinBookWeb3.at(bitcoinBook_address);

graphBook_json = require("/imports/smart-contracts/build/contracts/RaffleGraphBook.json");
graphBook_abi = graphBook_json['abi'];
graphBook_binary = graphBook_json["unlinked_binary"];
graphBook_address = graphBook_json["networks"]["1900"].address

let GraphBookWeb3 = web3.eth.contract(graphBook_abi);
GraphBookWeb3Instance = GraphBookWeb3.at(graphBook_address);

dappBook_json = require("/imports/smart-contracts/build/contracts/RaffleDappBook.json");
dappBook_abi = dappBook_json['abi'];
dappBook_binary = dappBook_json["unlinked_binary"];
dappBook_address = dappBook_json["networks"]["1900"].address

let DappBookWeb3 = web3.eth.contract(dappBook_abi);
DappBookWeb3Instance = DappBookWeb3.at(dappBook_address);

internetBook_json = require("/imports/smart-contracts/build/contracts/RaffleInternetBook.json");
internetBook_abi = internetBook_json['abi'];
internetBook_binary = internetBook_json["unlinked_binary"];
internetBook_address = internetBook_json["networks"]["1900"].address

let InternetBookWeb3 = web3.eth.contract(internetBook_abi);
InternetBookWeb3Instance = InternetBookWeb3.at(internetBook_address);

makersBook_json = require("/imports/smart-contracts/build/contracts/RaffleMakersBook.json");
makersBook_abi = makersBook_json['abi'];
makersBook_binary = makersBook_json["unlinked_binary"];
makersBook_address = makersBook_json["networks"]["1900"].address

let MakersBookWeb3 = web3.eth.contract(makersBook_abi);
MakersBookWeb3Instance = MakersBookWeb3.at(makersBook_address);
