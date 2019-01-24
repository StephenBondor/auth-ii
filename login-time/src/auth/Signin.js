import React from 'react';
import {withRouter} from 'react-router-dom';
import {login} from '../actions';
import {connect} from 'react-redux';

class Signin extends React.Component {
	state = {
		username: 'steve',
		password: 'pass'
	};

	handleInputChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.login(this.state);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor=''>Username</label>
					<input
						name='username'
						value={this.state.username}
						onChange={this.handleInputChange}
						type='text'
					/>
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						name='password'
						value={this.state.password}
						onChange={this.handleInputChange}
						type='password'
					/>
				</div>
				<div>
					<button type='submit'>Signin</button>
				</div>
			</form>
		);
	}
}

export default withRouter(
	connect(
		({logingIn}) => ({logingIn}),
		{login}
	)(Signin)
);
