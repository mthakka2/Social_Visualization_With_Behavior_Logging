import React from 'react';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import './Profile.css';
// import ReactTable from "react-table";


class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:null,
      activity: null,
      activity_visualized: null
    }
}
	
  componentDidMount(){
        this.loadActivities();
        this.interval = setInterval(() => this.loadActivities(), 3000);
        //this.interval = setInterval(() => this.handleUvBarClick(), 1000);
  
        fetch('http://localhost:3000/loadhistory', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          username : this.props.username
        })
    }) 
    .then(response => response.json())
        .then(data => {
          //console.log(data);
          //this.printHistory(data);
          this.setState({
            data: data
          })  
         })
      }  
      
  loadActivities(){
    fetch('http://localhost:3000/getActivities', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
      username : this.props.username
       })
    }) 
    .then(response => response.json())
        .then(activity => {
          this.setState({
            activity: activity
          })
          this.loadActivityTable()
         })       
  }

  loadActivityTable(){
      console.log("reached in activity table");
      if(this.state.activity === null){
      return( <div> Loading... </div>);
    }
    var tableHeaders = (<thead className = "insideHistory"> 
      <tr>
        <th> ID </th>
        <th> Activity </th>
        <th> Count </th>
        <th> Time </th>
       </tr> 
       </thead>
        );    
    var tableBody =      
          this.state.activity.map((activity) => {
           return (<tr key = {activity.id}>
           <td> {activity.id} </td>
          <td > {activity.activity}</td> 
          <td>{activity.count}</td> 
          <td>{activity.time} </td>
          </tr>
            )}
          );        

    return (<table className="history" width="100%">
    {tableHeaders}
    <tbody>{tableBody}</tbody>
    </table>
    )
 }    
  

  handleUvBarClick(activity){
    console.log("reached click handler");
    const activity_name = activity.activity;
    console.log("checking state",activity_name);
    if(activity_name === 'Ask_question Clicked'){
          fetch('http://localhost:3000/getActivity_AskButton', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              activity : activity_name
       })
    }) 
        .then(response => response.json())
        .then(activity => {
          this.setState({
            activity_visualized: activity
          })
          console.log("activities", this.state.activity_visualized);
         })   
    }

    else if(activity_name === 'Scrolled'){
        console.log("reached in elseif");
          fetch('http://localhost:3000/getActivity_AskButton', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              activity : activity_name
       })
    }) 
        .then(response => response.json())
        .then(activity => {
          this.setState({
            activity_visualized: activity
          })
          console.log("activities", activity);
         }) 
    }
    else if(activity_name === 'Search box clicked'){
        fetch('http://localhost:3000/getActivity_AskButton', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              activity : activity_name
       })
    }) 
        .then(response => response.json())
        .then(activity => {
          this.setState({
            activity_visualized: activity
          })
          console.log("activities", activity);
         }) 
    }
    else if(activity_name === 'Key pressed'){
      console.log("reached key pressed");
        fetch('http://localhost:3000/getActivity_AskButton', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              activity : activity_name
       })
    }) 
        .then(response => response.json())
        .then(activity => {
          this.setState({
            activity_visualized: activity
          })
          console.log("activities", activity);
         }) 
    }

    else if(activity_name === 'Clicked "Votes"'){
      console.log("reached key pressed");
        fetch('http://localhost:3000/getActivity_AskButton', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              activity : activity_name
       })
    }) 
        .then(response => response.json())
        .then(activity => {
          this.setState({
            activity_visualized: activity
          })
          console.log("activities", activity);
         }) 
    }    
  }

      constructAnotherBarChart(){
        if(this.state.activity_visualized === null){
          return(<div></div>)
        }
        return(
        <div>
        <BarChart width={1300} height={250} data={this.state.activity_visualized}
            margin={{top: 0, right: 250, left: 200, bottom: 15}}>
           <XAxis dataKey="username" stroke="#172457"/>
           <YAxis stroke="#172457"/>
           <CartesianGrid strokeDasharray="3 3" stroke = "#172457"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="count" fill="#2E4AA5" />
          </BarChart>
        </div> 
          );  
      }

    constructBarChart(){
      return(
        <div>
        <BarChart width={1300} height={250} data={this.state.activity}
            margin={{top: 0, right: 250, left: 200, bottom: 15}}>
           <XAxis dataKey="activity" stroke="#367817"/>
           <YAxis  stroke="#367817"/>
           <CartesianGrid strokeDasharray="3 3" stroke = "#367817"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="count" fill="#172457" onClick = {activity => this.handleUvBarClick(activity)}/>
        </BarChart>
        </div> 
          );
    }

  loadhistory(){
    if(this.state.data === null){
      return( <div> Loading... </div>);
    }
    var tableHeaders = (<thead className = "insideHistory"> 
      <tr>
        <th> ID </th>
        <th> Username </th>
        <th> Time </th>
        <th> Details </th>
       </tr> 
       </thead>
        );    
    var tableBody =      
          this.state.data.map((log) => {
           return (<tr key = {log.id}>
           <td> {log.id} </td>
          <td > {log.username}</td> 
          <td>{log.time}</td> 
          <td>{log.loginlogout} </td>
          </tr>
            )}
          );        

    return (<table className="history" width="100%">
    {tableHeaders}
    <tbody>{tableBody}</tbody>
    </table>
    )
 }
	render() {
		const {username, onButtonSubmit} = this.props;
    const URL = `https://stackoverflow.com/questions/tagged/java?sort=frequent&pageSize=15&token=${this.props.username}`;
    return (
			<div> 
          <div></div>
          <div className="headingProfile">
    			Hello {`${username}`}, Welcome to your Profile Page.
          </div>
    			<br />
          <div className="link">
    			<a target = " _blank" href = {URL}>Click Here to link to StackOverflow page</a>
          </div>
          <div className="historyTable">
          <h2> Log In History </h2>
          </div>
          {this.loadhistory()}
          <div className="dataHeading">
          <h4> Your Interactive Data Visualization </h4>
          </div>
          <div className="h6Heading">  
          <h6> Click on any one activity(bar) to look at the activity done by different users </h6> 
          </div>
          {this.constructBarChart()}
          {this.constructAnotherBarChart()}
    	</div>
			);
	}
}

export default Profile;