import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import './Profile.css';

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
        fetch('https://aqueous-forest-79868.herokuapp.com/loadhistory', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          username : this.props.username
        })
    }) 
    .then(response => response.json())
        .then(data => {
          this.setState({
            data: data
          })  
         })
      }  
      
  loadActivities(){
    fetch('https://aqueous-forest-79868.herokuapp.com/getActivities', {
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
    const activity_name = activity.activity;
    if(activity_name === 'Ask_question Clicked'){
          fetch('https://aqueous-forest-79868.herokuapp.com/getActivity_AskButton', {
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
                   })   
    }

    else if(activity_name === 'Scrolled'){
          fetch('https://aqueous-forest-79868.herokuapp.com/getActivity_AskButton', {
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
                   }) 
    }
    else if(activity_name === 'Search box clicked'){
        fetch('https://aqueous-forest-79868.herokuapp.com/getActivity_AskButton', {
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
          }) 
    }
    else if(activity_name === 'Key pressed'){
        fetch('https://aqueous-forest-79868.herokuapp.com/getActivity_AskButton', {
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
                   }) 
    }

    else if(activity_name === 'Clicked "Votes"'){
        fetch('https://aqueous-forest-79868.herokuapp.com/getActivity_AskButton', {
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
          <div className = "logActions">
            <h1> Why did you decide to log these actions? </h1>
            <p> I have logged 5 user actions. Those actions are </p> 
                <p> 1) Scrolling to the bottom of the page activity: I decided to log the scroll activity as it depicts the user's behavior
                    searching some answer. If a user scrolls to the bottom of the page, it shows that the user is searching for an answer 
                    and he is not able to find it on the top of the page adn ends up looking at the bottom of the page. </p>
                <p> 2) Search input box clicked: This activity shows that the user has not been able to find the answer to the 
                        question he is looking for in main page and he is deciding to search the question in the input box of search bar.
                        Searching shows him not able to find the questions in the main page and it also shows that maybe he is not looking
                        answers for JAVA but he is lookign for some other technology. </p>
                <p> 3) Key on keyboard pressed: This action depicts that user is searching for a particular keyword. If he tries to search 
                        something particular in search bar, it will show his willingness to find something. He can also press a key 
                        while finding a particular keyword from the whole page which is by doing (CTRL - F). This action shoes user's
                        continuation of searching something.</p>
                <p> 4) Clicked Votes: This action shows how the user is interested in just looking at the most popular answers. This can
                        mean that user knows some question but he wants to know that if his question has answers with highest votes. He may
                        also be interested in the people who have got the highest votes and wants to see if he can answer better than other.</p>
                <p> 5) Ask Question button clicked: This action is to show that user has not got answers anywhere on the web. He wants to rely
                        on StackOver Flow to get his answer. His clicking on ask question means that he is willing to post his question online
                        and get help from other community people.</p>
            </div>
            <div className = "logActions">
            <h1> Analysis and Findings </h1>
            <ul>
            <li> The pattern that I found with my actions is, once a user reaches stack overflow website, it means that
            the user is looking for answers on the website </li>
            <li> He tries to search the question by looking at the list of the questions on the main page and when he is not
            able to find it on the main page, he reached to the bottom of the page </li>
            <li> When he is not able to find the question on the main page, he tries to look at the question with the most votes
            by clicking the votes link and hoping to find it answer in the most voted answers. </li>
            <li> After not finding it in most voted answers, he tries to search it in whole website by clicking on the search
            bar and pressing a key to type something. </li>
            <li> If at last he is does not get satisfactory search results, he decides to ask question, post it online and 
            get answers from online community. </li>
            </ul>
            <p> The basic pattern is of a user trying to search an answer to a question, first looking at all the 
            questions on the main page(scroll activity), then trying to find in list of most voted answers(clicked on votes),
            then searching for the question(clicking on search bar and pressing keys on the keyboard) and when not finding answer 
            from any other methods, user ask question(clicking on ask question) and post it online. </p> 
            <p> I tried to look at the user perspective for using stack overflow. After working on stack over flow with user's 
            perspective, I find out the difficulties that can be caused if an answer cannot be found easily and that lead to 
            finding the pattern and the activities. It matters to build a user profile, by looking at user's specific activities
            it can help build user profile easily. So for building user profile, it is important to find patterns in activities.</p>
            </div>                      
    	</div>
			);
	}
}

export default Profile;