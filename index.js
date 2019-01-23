//imports
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const morgan = require('morgan');

//declarations
const server = express();
const db = knex(knexConfig.development);

//middleware
server.use(helmet());
server.use(express.json());
server.use(morgan());
function generateToken(user) {
	const payload = {
		username: user.username
	};
	const secret = process.env.JWT_SECRET;
	const options = {expiresIn: '10m'};

	return jwt.sign(payload, secret, options);
}

//Endpoints
server.get('/', (req, res) => {
	res.send('API running');
});

server.post('/api/register', (req, res) => {
	const userInfo = req.body;
	const hash = bcrypt.hashSync(userInfo.password, 12);
	userInfo.password = hash;

	db('users')
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
	const creds = req.body;

	db('users')
		.where({username: creds.username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}`,
					token
				});
			} else {
				res.status(401).json({you: 'Incorrect username or password'});
			}
		})
		.catch(err => res.status(500).json(err));
});

//Listening
const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
