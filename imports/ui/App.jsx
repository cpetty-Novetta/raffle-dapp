import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '/imports/api/tasks.js';
import { RegisteredUsers } from '/imports/api/users.js';


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
        this.renderUser.bind(this);
        this.createUserFile.bind(this);
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

    createUserFile() {
        console.log(this);
        var userId = this.props.currentUser._id;
        Meteor.call('user.insertUser', userId);
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

    renderUser() {
        const currentUserName = this.props.currentUser && this.props.currentUser.username;
        console.log("renderUser this: ", this);
        this.createUserFile.bind(this);

        return (
            <div className="userDiv">
                <UserInfo registeredUser={this.props.registeredUser}/>
                {this.props.registeredUser.registered ? '' :
                    <RegisterForTickets registeredUser={this.props.registeredUser}/>    
                }
            </div>
        )
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

    componentDidMount() {
        // this.createUserFile.bind(this);
        console.log('componentDidMount this: ',this);
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
                    {/*{this.props.currentUser ?*/}
                        
                            {this.renderUser()}
                            {/* Uncomment below to only allow single registration */}
                            
                            {/*<RegisterForTickets currentUser={this.props.currentUser}/>    */}
                        {/*: ''*/}
                    }

                    {/*{this.renderAdmin()}*/}
                </header>
            </div>
        );
    }
}

App.PropTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
    registeredUser: PropTypes.object.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('registeredUsers');

    return {
        tasks: Tasks.find({}, {sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
        registeredUser: RegisteredUsers.find({}).fetch(),
    };
}, App);