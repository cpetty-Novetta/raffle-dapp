import { Meteor } from 'meteor/meteor';
import '/imports/startup/ethereum-contract-startup-server';
import '/imports/api/tasks.js';
import '/imports/api/users.js';



Meteor.startup(() => {
  // code to run on server at startup
  
});
