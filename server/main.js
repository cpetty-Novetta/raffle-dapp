import { default as Web3 } from 'web3';
import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/ethereum-contract-startup-server';

import '/imports/api/users.js';
import '/imports/api/ledgerRaffle.js';
import '/imports/api/tshirtRaffle.js';
import '/imports/api/tbpTshirtRaffle.js';
import '/imports/api/bitcoinBookRaffle.js';
import '/imports/api/graphBookRaffle.js';
import '/imports/api/internetBookRaffle.js';
import '/imports/api/dappBookRaffle.js';
import '/imports/api/makersBookRaffle.js';

import { LedgerContractState } from '/imports/api/ledgerRaffle.js'
import { TshirtContractState } from '/imports/api/tshirtRaffle.js';
import { TbpTshirtContractState } from '/imports/api/tbpTshirtRaffle.js';
import { BitcoinBookContractState } from '/imports/api/bitcoinBookRaffle.js';
import { GraphBookContractState } from '/imports/api/graphBookRaffle.js';
import { DappBookContractState } from '/imports/api/dappBookRaffle.js';
import { InternetBookContractState } from '/imports/api/internetBookRaffle.js';
import { MakersBookContractState } from '/imports/api/makersBookRaffle.js';

Meteor.startup(() => {
    const stages = {
        0: 'Registration',
        1: 'Distribution',
        2: 'Disbursed',
    }
    
    LedgerWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage)  {
        const currentStage = stages[stage.valueOf()];
        console.log("The current stage: ", currentStage)
        LedgerContractState.update(
            'contractState',
            { $set: {currentStage: currentStage} },
            { upsert: true}
        )
    }))

    LedgerWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of Ledger Prizes: ", numPrizes)
        LedgerContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))

    LedgerWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf();
        console.log("Getting name of prize: ", prizeName)
        LedgerContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))
    TshirtWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of Tshirt Prizes: ", numPrizes)
        TshirtContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    TshirtWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        TshirtContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

    TbpTshirtWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of TBP Tshirt Prizes: ", numPrizes)
        TbpTshirtContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    TbpTshirtWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        TbpTshirtContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

    BitcoinBookWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of BitcoinBook Prizes: ", numPrizes)
        BitcoinBookContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    BitcoinBookWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        BitcoinBookContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

    GraphBookWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of GraphBook Prizes: ", numPrizes)
        GraphBookContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    GraphBookWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        GraphBookContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

    DappBookWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of DappBook Prizes: ", numPrizes)
        DappBookContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    DappBookWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        DappBookContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

        InternetBookWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of InternetBook Prizes: ", numPrizes)
        InternetBookContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    InternetBookWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        InternetBookContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))

        MakersBookWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of MakersBook Prizes: ", numPrizes)
        MakersBookContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))
    MakersBookWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
        const prizeName = _prizeName.valueOf()
        console.log("Getting name of prize: ", prizeName)
        MakersBookContractState.update(
            'contractState',
            { $set: {prizeName: prizeName} },
            { upsert: true}
        )
    }))
});
