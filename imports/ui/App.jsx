import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks, Tickets } from '/imports/api/tasks.js';


import Task from '/imports/ui/Task.jsx';
import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper.jsx';
import RaffleStats from '/imports/ui/components/RaffleStats';
import RegisterForTickets from '/imports/ui/components/RegisterForTickets';
import DistributeFunds from '/imports/ui/components/DistributeFunds';
import UserInfo from '/imports/ui/components/UserInfo';

// App component - represents the whole Appe
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hideCompleted: false,
        };

        this.renderAdmin.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    refreshStats() {
        // Refresh all contract and user stats after something is called.
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;
            // const showPrivateButton = true;

            return (
                <Task 
                    key={task._id} 
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    renderAdmin() {
        const currentUserName = this.props.currentUser && this.props.currentUser.username;
        if (currentUserName === 'cpetty') {
            
            return (
                <div className="adminDiv">
                    <DistributeFunds />
                </div> 
            )
        }
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    <RaffleStats />

                    {/* this only shows if user is logged into an account */}
                    {this.props.currentUser ?
                        <div className="userDiv">
                            <UserInfo currentUser={this.props.currentUser}/>
                            {this.props.currentUser.registered ? '' :
                                <RegisterForTickets currentUser={this.props.currentUser}/>    
                            }
                        </div> : ''
                    }

                    {this.renderAdmin()}
                </header>
            </div>
        );
    }
}

App.PropTypes = {
    tasks: PropTypes.array.isRequired,
    tickets: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('tickets');
    Meteor.subscribe('userData');

    return {
        tasks: Tasks.find({}, {sort: { createdAt: -1 } }).fetch(),
        tickets: Tickets.find({}, {sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);