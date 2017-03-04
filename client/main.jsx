import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/imports/startup/accounts-config.js';
import '/imports/startup/ethereum-contract-startup';

import App from '/imports/ui/App.jsx';
// import '/imports/ui/routes/routes.jsx';

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});