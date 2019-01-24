import React from 'react';
import axios from 'axios';

class Users extends React.Component {
	state = {
		users: [],
		OKToRender: true
	};

	render() {
		return (
			<>
				<h2>List of Users</h2>
				<ul>
					{this.state.users.map(u => (
						<li key={u.id}>{u.name}</li>
					))}
				</ul>
			</>
		);
	}

	async componentDidMount() {
		const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;

		console.log('endpoint', endpoint);

		try {
			const token = localStorage.getItem('jwt');
			const requestOptions = {
				headers: {
					authorization: token
				}
			};

			const response = await axios.get(endpoint, requestOptions);

			this.setState({users: response.data.users});
		} catch (error) {
			console.error('we ran into an issue getting the users');
		}
	}
}

export default Users;
