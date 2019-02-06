import React, {Component} from 'react';
import {connect} from 'react-redux';
// import styled from 'styled-components';
import {GlobalStyle} from './GlobalStyles';
import {withRouter, Route, NavLink} from 'react-router-dom';
import {register, logout} from './actions';
import Users from './users/Users';
import Signin from './auth/Signin';
import SignUp from './auth/SignUp';

class App extends Component {
	constructor() {
		super();
		this.state = {
			OKToRender: true
		};
	}

	render() {
		return (
			<>
				<GlobalStyle />
				<header>
					<nav>
						<NavLink to='/signin'>Signin</NavLink>
						&nbsp;|&nbsp;
						<NavLink to='/users'>Users</NavLink>
						&nbsp;|&nbsp;
						<NavLink to='/singout' onClick={this.props.logout}>
							SignOut
						</NavLink>
						&nbsp;|&nbsp;
						<NavLink to='/signup'>SignUp</NavLink>
					</nav>
				</header>
				<main>
					<Route path='/signin' component={Signin} />
					<Route path='/users' component={Users} />
					<Route path='/signup' component={SignUp} />
				</main>
			</>
		);
	}
}

export default withRouter(
	connect(
		({logingIn, self}) => ({logingIn, self}),
		{register, logout}
	)(App)
);
