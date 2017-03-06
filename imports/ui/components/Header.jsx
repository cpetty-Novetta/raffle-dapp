import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowswerRouter as Router, NavLink, withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

class Header extends React.Component {
    logoutUser(event) {
        event.preventDefault();
        Meteor.logout((err) => {
            Materialize.toast("You've logged out", 4000);
            Session.set("loggedIn", false);
            this.props.history.push('/');
        });
    }

  render() {
      var isUserLoggedIn = () => {
          return Session.get("loggedIn");
      }
    var navStyle={
      backgroundColor: "#42a5f5", 
      paddingLeft: "12px"
    }
    return (
          <nav style={navStyle}>
            <div className="nav-wrapper">
              <NavLink to="/" className="brand-logo">Raffle Dapp</NavLink>
              {isUserLoggedIn() ? 
              <ul id="nav-mobile" className="right">
                <li id="nav-button" ><a onClick={this.logoutUser.bind(this)}>Logout</a></li>
              </ul> :
              <ul id="nav-mobile" className="right">
                <li id="nav-button" ><NavLink activeClassName="active-nav" to="/register">Register</NavLink></li>
                <li id="nav-button" ><NavLink activeClassName="active-nav" to="/login">Login</NavLink></li>
              </ul> 
              }
            </div>
          </nav>
    );
  }
}

export default withRouter(Header);
