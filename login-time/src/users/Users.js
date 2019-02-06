import React from 'react';
import {getUsers} from '../actions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Users extends React.Component {
	state = {
		OKToRender: false
	};

	//Fetch the State from libsyn
	componentDidMount() {
		this.props.getUsers();
	}

	//Only allow content to render once podast is fully fetched
	componentDidUpdate(prevProps) {
		if (this.props.gettingUsers !== prevProps.gettingUsers) {
			if (!this.props.gettingUsers) {
				this.setState({
					OKToRender: true
				});
			}
		}
	}

	render() {
		if (this.props.self.length === 0) {
			return <div>You must log in to view users</div>;
		}
		// Check to make sure all state is initiallized
		else if (!this.state.OKToRender) return <div> Loading...</div>;

		return (
			<>
				<h2>List of Users</h2>
				<ul>
					{this.props.users.map(u => (
						<li key={u.id}>{u.username}</li>
					))}
				</ul>
			</>
		);
	}
}

export default withRouter(
	connect(
		({gettingUsers, users, self}) => ({gettingUsers, users, self}),
		{getUsers}
	)(Users)
);
