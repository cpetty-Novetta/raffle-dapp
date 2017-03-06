import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import '/imports/startup/accounts-config.js';
import '/imports/startup/ethereum-contract-startup';

import MainLayout from '/imports/ui/containers/MainLayout.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <MainLayout />,
    document.getElementById('render-target')
  );
});