import React from 'react';

const History = ({username, logindatetime, logoutdatetime}) => {
	return(
		<div>
		<div className = 'white f3'>
			{`${username}`}
			{`${logindatetime}`}
			{`${logoutdatetime}`}
		</div>
		</div>
		);
}

export default History;