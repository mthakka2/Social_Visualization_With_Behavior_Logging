import React from 'react';
import './Nav.css';
// import Moment from 'react-moment';
import 'moment-timezone';
// import moment from 'moment';


class Nav extends React.Component {

	onLogOut(username){
		fetch('https://aqueous-forest-79868.herokuapp.com/history1', {
	      method: 'post',
	      headers: {'Content-Type' : 'application/json'},
	      body: JSON.stringify({
	      	username : username,
	      })
    }) 
    .then(response => response.json())
        .then(data => {
        })
    	}
	
	render() {
	    const { onPathChange, isSignedIn, username } = this.props;
		if(isSignedIn){
	    	return (
	    		<nav>
	    			<p className = "button"  onClick = { () => {onPathChange('signin'); this.onLogOut(username); }}> Log out </p>
	    		</nav>	
	        );
		}
	}
} 

export default Nav;
