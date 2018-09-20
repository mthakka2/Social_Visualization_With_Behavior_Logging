import React, { Component } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Nav from './Components/Nav';
import Profile from './Components/Profile';
import './App.css';

const initialState = {
      path: 'signin',
      isSignedIn : false,
      data : [],
      user : {
        id: '',
        name: '',
        username: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
 }

  printHistory = (data) => {
    console.log("reached print history");
    this.setState({data1 : {
      id: data.id,
      username: data.name,
      logindatetime : data.logindatetime,
      logoutdatetime: data.logoutdatetime
    }})
  }

  loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      username: data.username
  }})
}

  onPathChange = (path) => {
    if(path === 'signout'){
      this.setState(initialState)
    } else if(path === 'home'){
      isSignedIn: true,
      this.setState({isSignedIn: true})
    }
    this.setState({path: path});
  }

  render() {
    return (
      <div className="App">
      {
        this.state.path === 'home' ?                  
          <div>
            <Nav isSignedIn = {this.state.isSignedIn} onPathChange = {this.onPathChange} username = {this.state.user.username} />
            <Profile username = {this.state.user.username}  data = {this.state.data} />
          </div>
        :(
        this.state.path === 'signin' ?
            <Login  loadUser = {this.loadUser} onPathChange = {this.onPathChange}/>
            :
            <Register loadUser = {this.loadUser} onPathChange = {this.onPathChange}/>
        )

          //   this.state.path === 'signin' ?
      }
      </div>
    );
  }
}

export default App;
