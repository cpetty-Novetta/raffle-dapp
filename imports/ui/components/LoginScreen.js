import React, { Component } from 'react';
import './App.css';
import img_elImage from './images/LoginScreen_elImage.png';

// UI framework component imports
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      userNameField: '',
      passwordField: '',
    };
  }

  // Properties used by this component:
  // appActions

  textInputChanged_userNameField = (event) => {
    this.setState({userNameField: event.target.value});
  }
  
  textInputChanged_passwordField = (event) => {
    this.setState({passwordField: event.target.value});
  }
  
  onClick_button = (ev) => {
    // Go to screen 'Home'
    this.props.appActions.goToScreen('home');
  
  }
  
  
  render() {
    const baseStyle = {};
    const style_rectangle = {
        background: 'rgba(163, 165, 168, 0.616)',
        pointerEvents: 'none',
    
      };
    const style_image = {
        backgroundImage: 'url('+img_elImage+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        pointerEvents: 'none',
    
      };
    const style_headerTitle = {
        fontSize: 30.1,
        fontFamily: "'AvenirNext-DemiBold', sans-serif",
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        pointerEvents: 'none',
    
      };
    const style_userNameField = {
        display: 'block',
        paddingLeft: 8,
        backgroundColor: 'white',
    
      };
    const style_passwordField = {
        display: 'block',
        paddingLeft: 8,
        backgroundColor: 'white',
    
      };
    const style_button = {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        textTransform: 'none',
        cursor: 'pointer',
    
      };
    return (
      <Container className="AppScreen LoginScreen" style={baseStyle}>
        <div className="background">
          <div className='elRectangle' style={style_rectangle} />
        </div>
        <div className="layoutFlow">
          <div className='elImage'>
            <div style={style_image} />
          
          </div>
          <div className='elHeaderTitle'>
            <div style={style_headerTitle}>
              <div>Tech Talk Raffle</div>
            </div>
          
          </div>
          <div className='elUserNameField'>
            <input style={style_userNameField} type="text" placeholder="User name" onChange={this.textInputChanged_userNameField} value={this.state.userNameField}  />
          
          </div>
          <div className='elPasswordField'>
            <input style={style_passwordField} type="text" placeholder="Password" onChange={this.textInputChanged_passwordField} value={this.state.passwordField}  />
          
          </div>
          <div className='actionFont elButton'>
            <Button style={style_button}  color="primary" variant="raised" onClick={this.onClick_button} >
              Sign in
            </Button>
          
          </div>
        </div>
      </Container>
    )
  }

}
