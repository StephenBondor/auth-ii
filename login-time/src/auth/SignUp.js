import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {register, login, registerReset} from '../actions';
import bcrypt from 'bcryptjs';

class SignUp extends React.Component {
	state = {
		username: 'steveB',
		password: 'pass'
	};

	handleInputChange = event => {
		let {name, value} = event.target;
		this.setState({[name]: value});
	};

	handleSubmit = event => {
		event.preventDefault();
		let creds = this.state;
		creds.password = bcrypt.hashSync(this.state.password, 12);
		this.props.register(creds);
		this.props.login(creds);
		this.setState({username: '', password: ''});
	};

	render() {
		if (this.props.self !== '') {
			return <div>Logged in as {this.props.self}</div>;
		} else if (this.props.registerFailed) {
			return (
				<div>
					Registration failed, try onther username or password?{' '}
					<button onClick={() => this.props.registerReset()}>
						YES
					</button>
				</div>
			);
		} else {
			return (
				<form onSubmit={this.handleSubmit}>
					<h2>Sign UP!</h2>
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
						<button type='submit'>SignUp</button>
					</div>
				</form>
			);
		}
	}
}

export default withRouter(
	connect(
		({logingIn, self, registerFailed}) => ({
			logingIn,
			self,
			registerFailed
		}),
		{register, login, registerReset}
	)(SignUp)
);
