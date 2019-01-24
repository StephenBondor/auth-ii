import {
	//Register
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	REGISTER_AGAIN,

	//Login
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,

	//Get users
	USERLIST_START,
	USERLIST_SUCCESS,
	USERLIST_FAILURE,

	//Logout
	LOGOUT
} from '../actions';

const initialState = {
	logingIn: false,
	registering: false,
	gettingUsers: false,
	registerFailed: false,
	users: [],
	self: '',
	error: null
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		//Register
		case REGISTER_START:
			return {...state, registering: true};
		case REGISTER_SUCCESS:
			return {
				...state,
				registering: false
			};
		case REGISTER_FAILURE:
			return {
				...state,
				error: action.payload,
				registering: false,
				registerFailed: true
			};
		case REGISTER_AGAIN:
			return {...state, registerFailed: false};

		//Login
		case LOGIN_START:
			return {...state, logingIn: true};
		case LOGIN_SUCCESS:
			localStorage.setItem('jwt', action.payload.data.token);
			return {
				...state,
				self: action.payload.data.loggedInAs,
				logingIn: false
			};
		case LOGIN_FAILURE:
			return {...state, error: action.payload, logingIn: false};

		//Get user list
		case USERLIST_START:
			return {...state, gettingUsers: true};
		case USERLIST_SUCCESS:
			console.log(action.payload, 'from reducers');
			return {...state, users: action.payload, gettingUsers: false};
		case USERLIST_FAILURE:
			return {...state, error: action.payload, gettingUsers: false};

		//Logout
		case LOGOUT:
			return {...state, users: [], self: ''};

		//Default
		default:
			return state;
	}
};

export default loginReducer;
