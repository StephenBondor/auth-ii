//imports
require('dotenv').config(); //i do not understand how this line works
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const morgan = require('morgan');
const cors = require('cors');

//declarations
const server = express();
const db = knex(knexConfig.development);

//middleware
server.use(helmet());
server.use(express.json());
server.use(morgan());
server.use(cors());
function lock(req, res, next) {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({message: 'token invalid'});
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({message: 'no token provided'});
	}
}
function checkRole(role) {
	return function(req, res, next) {
		if (req.decodedToken.roles.includes(role)) {
			next();
		} else {
			res.status(403).json({message: `you need to be an ${role}`});
		}
	};
}

//helpers
function generateToken(user) {
	const payload = {
		username: user.username,
		roles: ['sales', 'admin']
	};
	const secret = process.env.JWT_SECRET; //i do not understand how this line works
	const options = {expiresIn: '10m'};

	return jwt.sign(payload, secret, options);
}

//Endpoints
server.get('/api', (req, res) => {
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
					loggedInAs: `${user.username}`,
					token
				});
			} else {
				res.status(401).json({you: 'Incorrect username or password'});
			}
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/user/me', lock, (req, res) => {
	db('users')
		.select('id', 'username')
		.where({username: req.decodedToken.username})
		.first()
		.then(user => {
			res.status(200).json({user, decodedToken: req.decodedToken});
		})
		.catch(err => res.status(500).json(err));
});

server.get(
	'/api/users',
	// lock, checkRole('admin'),
	(req, res) => {
		db('users')
			.select('id', 'username')
			.then(user => {
				res.status(200).json({user, decodedToken: req.decodedToken});
			})
			.catch(err => res.status(500).json(err));
	}
);

//Listening
const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
