import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render long buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }
    componentWillWUnmount() {
        // Clean up Blaze now
        Blaze.remove(this.view);
    }
    render() {
        return <span ref="container" />;
    }
}