import React, {Component} from 'react';
import {connect} from 'react-redux';
// import styled from 'styled-components';
import {GlobalStyle} from './GlobalStyles';
import {withRouter, Route, NavLink} from 'react-router-dom';
import {register} from './actions';
import Users from './users/Users';
import Signin from './auth/Signin';

class App extends Component {
	constructor() {
		super();
		this.state = {
			OKToRender: true
		};
	}

	//Fetch the State from libsyn
	componentDidMount() {
		//this.props.getPodcasts();
	}

	//Only allow content to render once podast is fully fetched
	componentDidUpdate(prevProps) {
		if (this.props.logingIn !== prevProps.logingIn) {
			if (!this.props.logingIn) {
				this.setState({
					OKToRender: true
				});
			}
		}
	}

	signout = () => {
		localStorage.removeItem('jwt');
	};

	render() {
		// Check to make sure all state is initiallized
		if (!this.state.OKToRender) return <div> Loading...</div>;

		return (
			<>
				<GlobalStyle />
				<header>
					<nav>
						<NavLink to='/signin'>Signin</NavLink>
						&nbsp;|&nbsp;
						<NavLink to='/users'>Users</NavLink>
						&nbsp;|&nbsp;
						<NavLink to='/' onClick={this.signout}>
							Signout
						</NavLink>
					</nav>
				</header>
				<main>
					<Route path='/signin' component={Signin} />
					<Route path='/users' component={Users} />
				</main>
			</>
		);
	}
}

export default withRouter(
	connect(
		({logingIn, self}) => ({logingIn, self}),
		{register}
	)(App)
);
