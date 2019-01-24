import axios from 'axios';

//Register
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

//Login
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//Get user list
export const USERLIST_START = 'USERLIST_START';
export const USERLIST_SUCCESS = 'USERLIST_SUCCESS';
export const USERLIST_FAILURE = 'USERLIST_FAILURE';

//const URL = 'http://localhost:3300/api';
const endpoint = process.env.REACT_APP_API_URL;

//register
export const register = creds => dispatch => {
	dispatch({type: REGISTER_START, paylaod: creds});
	axios
		.post(`${endpoint}/api/register`, creds)
		.then(response => {
			console.log('Register success', response);
			dispatch({type: REGISTER_SUCCESS, payload: response.data});
		})
		.catch(err => {
			console.log('Register failed', err);
			dispatch({type: REGISTER_FAILURE, payload: err});
		});
};

//login
export const login = creds => dispatch => {
	dispatch({type: LOGIN_START, paylaod: creds});
	axios
		.post(`${endpoint}/api/login`, creds)
		.then(response => {
			console.log('Login success', response);
			dispatch({type: LOGIN_SUCCESS, payload: response});
		})
		.catch(err => {
			console.log('Login failed', err);
			dispatch({type: LOGIN_FAILURE, payload: err});
		});
};

//get users
export const getUsers = creds => dispatch => {
	dispatch({type: USERLIST_START, paylaod: creds});
	axios
		.get(`${endpoint}/api/users`, creds)
		.then(response => {
			console.log('Get users success', response);
			dispatch({type: USERLIST_SUCCESS, payload: response.data});
		})
		.catch(err => {
			console.log('Get users failed', err);
			dispatch({type: USERLIST_FAILURE, payload: err});
		});
};
