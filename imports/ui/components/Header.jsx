import React from 'react';
import { BrowswerRouter as Router, NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    var navStyle={
      backgroundColor: "#42a5f5", 
      paddingLeft: "12px"
    }
    return (
          <nav style={navStyle}>
            <div className="nav-wrapper">
              <NavLink to="/" className="brand-logo">Raffle Dapp</NavLink>
              <ul id="nav-mobile" className="right">
                <li id="nav-button" ><NavLink activeClassName="active-nav" to="/register">Register</NavLink></li>
                <li id="nav-button" ><NavLink activeClassName="active-nav" to="/login">Login</NavLink></li>
              </ul>
            </div>
          </nav>
    );
  }
}
