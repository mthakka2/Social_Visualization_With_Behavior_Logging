const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const moment = require('moment');


const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'amoi9825049931',
		database: 'aw'
	}
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/apitesting/:event/:token", (req,res) => {
	console.log(req.params.event);
	const event = req.params.event;
	const username = req.params.token;
	const time = moment().format('MMMM Do YYYY, h:mm:ss a');
	db.select('username', 'activity').from('activities')
	.where('username' , '=' , username)
	.andWhere('activity' ,'=', event)
		.then(data => {
			if(!(data.length === 0)){
				db('activities')
				.where('username', '=', username)
				.andWhere('activity', '=', event)
				.increment('count', 1)
				.then(user => {
					res.json(user);
				})
			}
			else{
				db('activities')
					.returning('*')
					.insert({
						username: username,
						activity : event,
						count : 1,
						time: time
					}).then(user => {
						res.json(user);
					})
				}
		})
	})


app.get('/', (req,res) => {
	res.send('it is working!');
})

app.post ('/signin', (req,res) => {
	const {username, password} = req.body;
	if(!username || !password){
		return res.status(400).json('incorrect form submission');
	}
	db.select('username', 'password').from('login')
		.where('username' , '=' , req.body.username)
		.andWhere('password' , '=', req.body.password)
		.then(data => {
			if(!(data.length === 0)){
				return db.select('*').from('users')
				.where('username', '=', req.body.username)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
			}else{
			res.status(400).json('wrong credentials')
		}
		})
		.catch(err => res.status(400).json('wrong credentials'))
})

app.post ('/getActivities', (req,res) => {
	const {username} = req.body
	db.select('id','activity', 'count', 'time').from('activities')
	.where('username', '=', username)	
	.then(activity => {
		res.json(activity);
	})
})

app.post ('/getActivity_AskButton', (req,res) => {
	const {activity} = req.body
	db.select('username', 'count', 'time').from('activities')
	.where('activity', '=', activity)	
	.then(activity => {
		console.log("Sending these activities", activity);
		res.json(activity);
	})
})


app.post ('/loadhistory', (req,res) => {
	const { username } = req.body
	db('history')
	.where('username', username)	
	.then(user => {
		res.json(user);
	})
})

app.post ('/history1', (req,res) => {
	const { username } = req.body
	const time = moment().format('MMMM Do YYYY, h:mm:ss a');
	db('history')
	.returning('*')
	.insert({
		username: username,
		time : time,
		loginlogout: 'Logged Out'
	}).then(user => {
		res.json(user);
	})
})

app.post ('/history', (req,res) => {
	const {username, password} = req.body
	const time = moment().format('MMMM Do YYYY, h:mm:ss a');
	db.select('username', 'password').from('login')
		.where('username' , '=' , req.body.username)
		.andWhere('password' , '=', req.body.password)
		.then(data => {
		if(!(data.length === 0)){		
			db('history')
			.returning('*')
			.insert({
				username: username,
				time : time,
				loginlogout: 'Logged In'
			}).then(user => {
				res.json(user);
			})
}

})
	})

app.post('/register', (req,res) => {
	const { name, username, password } = req.body;
	if(!username || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	 db.transaction(trx => {
	 	trx.insert({
	 		password: password,
	 		username: username
	 	})
	 	.into('login')
	 	.returning('username')
	 	.then(loginInName => {
			return trx('users')
				.returning('*')
				.insert({
					name: name,
					username: loginInName[0],
					password: password
					
		})
		.then(user => {
			res.json(user[0]);
		})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("not register"))
	})

if(process.env.NODE_ENV === "production"){
	const path = require("path");
	app.use(express.static(path.join(__dirname, "/client/build")));

	app.get("*", (req,res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
}

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})