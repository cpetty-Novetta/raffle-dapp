import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowswerRouter as Router, NavLink, withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

class Header extends React.Component {
    logoutUser(event) {
        event.preventDefault();
        Meteor.logout((err) => {
          console.log(this.props)
            Materialize.toast("You've logged out", 4000);
            // this.props.history.push('/register');
        });
    }

    componentDidMount() {
        // Show sideNav
        $(".button-collapse").sideNav();
        // $('.button-collapse').sideNav('show');
        // Hide sideNav
        $('.button-collapse').sideNav('hide');
        // Destroy sideNav
        // $('.button-collapse').sideNav('destroy');
    }

  render() {
    var navStyle={
      backgroundColor: "#42a5f5", 
      paddingLeft: "12px"
    }
    return (
          <nav style={navStyle}>
            <div className="nav-wrapper">
              <NavLink to="/" className="brand-logo left">Tech Talk Raffle Dapp</NavLink>
              <a href="#" data-activates="mobile-demo" className="button-collapse right"><i className="material-icons">menu</i></a>
              {this.props.currentUser && this.props.currentUser._id ? 
              <ul className="side-nav" id="mobile-demo">
                <li><a onClick={this.logoutUser.bind(this)}>Logout</a></li>
              </ul> :
              <ul className="side-nav" id="mobile-demo">
                <li><NavLink activeClassName="active-nav" to="/register">Register</NavLink></li>
                <li><NavLink activeClassName="active-nav" to="/login">Login</NavLink></li>
              </ul>
              }
              <div className="nav-content">
                {this.props.currentUser && this.props.currentUser._id ? 
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li id="nav-button" ><a onClick={this.logoutUser.bind(this)}>Logout</a></li>
                </ul> :
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li id="nav-button" ><NavLink activeClassName="active-nav" to="/register">Register</NavLink></li>
                  <li id="nav-button" ><NavLink activeClassName="active-nav" to="/login">Login</NavLink></li>
                </ul> 
                }
              </div>
            </div>
          </nav>
    );
  }
}

export default withRouter(Header);
