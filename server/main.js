import { default as Web3 } from 'web3';
import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/ethereum-contract-startup-server';

import '/imports/api/users.js';
import '/imports/api/ledgerRaffle.js';
import '/imports/api/tshirtRaffle.js';

import { LedgerContractState } from '/imports/api/ledgerRaffle.js'
import { TshirtContractState } from '/imports/api/tshirtRaffle.js';

Meteor.startup(() => {
    const stages = {
        0: 'Registration',
        1: 'Distribution',
        2: 'Disbursed',
    }
    
    RaffleWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage)  {
        const currentStage = stages[stage.valueOf()];
        console.log("The current stage: ", currentStage)
        LedgerContractState.update(
            'contractState',
            { $set: {currentStage: currentStage} },
            { upsert: true}
        )
    }))

    RaffleWeb3Instance.numPrizes(Meteor.bindEnvironment(function(err, _numPrizes)  {
        const numPrizes = _numPrizes.valueOf();
        console.log("Getting number of Ledger Prizes: ", numPrizes)
        LedgerContractState.update(
            'contractState',
            { $set: {numPrizes: numPrizes} },
            { upsert: true}
        )
    }))

    RaffleWeb3Instance.prizeName(Meteor.bindEnvironment(function(err, _prizeName)  {
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
});
