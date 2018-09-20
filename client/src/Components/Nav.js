import React from 'react';
import './Nav.css';
// import Moment from 'react-moment';
import 'moment-timezone';
// import moment from 'moment';


class Nav extends React.Component {

	onLogOut(username){
		console.log("log out", username);
		// var tempDate = new Date();
  // 		var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  // 		const currDate = date;
  		fetch('http://localhost:3000/history1', {
	      method: 'post',
	      headers: {'Content-Type' : 'application/json'},
	      body: JSON.stringify({
	      	username : username,
	        //logoutdatetime: currDate
	        // username: this.state.signInName,
	        // password: this.state.signInPassword
	      })
    }) 
    .then(response => response.json())
        .then(data => {
          console.log(data);
          // if(data) {
          //   this.props.loadUser(data);
          //   this.props.onRouteChange('home');
          // }
          //if(user.id){
          //   //this.props.loadUser(user);
          //   this.props.onRouteChange('home');        
          // }
         })
        //this.onLoginHistory();
  		//console.log(currDate);
	}
		// fetch('http://localhost:3000/signin', {
	 //      method: 'post',
	 //      headers: {'Content-Type' : 'application/json'},
	 //      body: JSON.stringify({

	 //        username: this.state.signInName,
	 //        password: this.state.signInPassword
	 //      })
	 //    }) 
	 //    .then(response => response.json())
	 //        .then(data => {
	 //          //console.log(data);
	 //          if(data) {
	 //            this.props.loadUser(data);
	 //            this.props.onRouteChange('home');
	 //          }
	 //          //if(user.id){
	 //          //   //this.props.loadUser(user);
	 //          //   this.props.onRouteChange('home');        
	 //          // }
	 //         })
	 //        this.onLoginHistory();
	 //  }

		// }

	render() {
	    const { onPathChange, isSignedIn, username } = this.props;
		//console.log("navigation" ,username);
		if(isSignedIn){
	    	return (
	    		<nav>
	    			<p className = "button"  onClick = { () => {onPathChange('signin'); this.onLogOut(username); }}> Log out </p>
	    		</nav>	
	        );
		}
	}
} 






// const Nav = ({isSignedIn, onRouteChange}) =>  {
// 	if(isSignedIn){
//     	return(
//     		<nav>
//     			<p className = "button"  onClick = { () => onRouteChange('signin') }> Log out </p>
//     		</nav>	
//     	);
// 	} 
// }

export default Nav;
