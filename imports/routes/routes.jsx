import React from 'react';
import {mount} from 'react-mounter';

import App from '/imports/ui/App.jsx';

FlowRouter.route("/", {
    name: 'home',
    action() {
        mount(App)
    }
})