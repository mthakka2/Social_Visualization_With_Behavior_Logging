import React from 'react';
import './Login.css';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signInName: '',
      signInPassword: ''
    }
  }
  onNameChange = (event) => {
      this.setState({signInName: event.target.value} )
  }

  onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value} )
  }
 
  onLoginHistory = () => {
    fetch('http://localhost:3000/history', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: this.state.signInName,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
        .then(data => {
          console.log(data);
  })
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        username: this.state.signInName,
        password: this.state.signInPassword
      })
    }) 
    .then(response => response.json())
        .then(data => {
            if(data.id) {
            this.props.loadUser(data);
            this.props.onPathChange('home');
          }
       })
        this.onLoginHistory();
  }

  render() {
    const { onPathChange } = this.props;
    return(
    <div className = "login">
      <div>
        <h1 className="heading"> Login </h1>
         <div>
          <input onChange = {this.onNameChange} type= "text" placeholder = "User Name"   />
          <input onChange = {this.onPasswordChange} type= "password" placeholder = "Password"   />
          <input onClick = {this.onSubmitSignIn} className = "shadow" type= "submit" name= "Submit" value = "Submit" ></input>
          <p onClick = {() => onPathChange('register')} className="register"> Register </p>
        </div>  
      </div>
    </div>  
    );
  }
} 

export default Login;