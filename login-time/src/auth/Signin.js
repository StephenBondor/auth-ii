import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions';

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
		if (this.props.self !== '')
			return <div>Logged in as {this.props.self}</div>;
		return (
			<form onSubmit={this.handleSubmit}>
				<h2>Sign IN!</h2>
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
		({logingIn, self}) => ({logingIn, self}),
		{login}
	)(Signin)
);
