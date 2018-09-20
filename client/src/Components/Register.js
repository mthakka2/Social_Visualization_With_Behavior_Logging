import React from 'react';
import './Register.css';


class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      username:'',
      password: ''
    }
  }
  onNameChange = (event) => {
      this.setState({name: event.target.value} )
  }

  onUserNameChange = (event) => {
      this.setState({username: event.target.value} )
  }

  onPasswordChange = (event) => {
      this.setState({password: event.target.value} )
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password
      })
    }) 
    .then(response => response.json())
        .then(user => {
          if(user) {
              this.props.loadUser(user);
              this.props.onPathChange('signin');      
          }
          // if(user.id){
          //   this.props.loadUser(user);
          //   this.props.onRouteChange('home');        
          // }
        })
      //this.props.onRouteChange('home');
   }

  render() {
    const { onPathChange } = this.props;
    return(
    <div className = "register">
      <div>
        <h1 className="heading"> Register </h1>
         <div>
          <input onChange = {this.onNameChange} type= "text" placeholder = "Name"   />
          <input onChange = {this.onUserNameChange} type= "text" placeholder = "User Name"   />
          <input onChange = {this.onPasswordChange} type= "password" placeholder = "Password"   />
          <input onClick = {this.onSubmitSignIn} className = "shadow" type= "submit" name= "Submit" value = "Sign Up" ></input>
        </div>      
      </div>
    </div>    
    );
  }
} 

export default Register;