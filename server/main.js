import { Meteor } from 'meteor/meteor';
import '/imports/startup/ethereum-contract-startup-server';

import '/imports/api/users.js';
import '/imports/api/ethereumFunctions.js';

import { ContractState } from '/imports/api/ethereumFunctions.js'

Meteor.startup(() => {
  const stages = {
    0: 'Registration',
    1: 'Distribution',
    2: 'Disbursed',
}
    

    RaffleWeb3Instance.getStage(Meteor.bindEnvironment(function(err, stage)  {
        const currentStage = stages[stage.valueOf()];
        console.log("Got new currentStage: ", currentStage)
        ContractState.update(
            'contractState',
            { $set: {currentStage: currentStage} },
            { upsert: true}
        )
    }))
});
