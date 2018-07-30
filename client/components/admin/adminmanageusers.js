import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../store/action-creators'
import AdminSidebar from './adminSidebar'

class AdminManageUsers extends Component {
	componentDidMount() {
		this.props.fetchUsers()
	}
	render() {
		const { users } = this.props
		console.log('Products', users)
		return (
			<div id="admin">
				<div className="row">
					<AdminSidebar />
					<div className="admin-view">
						<h3>Manage Users</h3>
						<div className="top-view">
							<Link to="/#">
								<button type="submit" className="btn btn-primary">
									Add new user
								</button>
							</Link>
						</div>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th scope="col">Id</th>
									<th scope="col">Image</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Address</th>
									<th scope="col">Role</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => (
									<tr key={user.id}>
										<th scope="row">{user.id}</th>
										<td>
											<img src={user.userImage} />
										</td>

										<td>
											<Link to={'/admin-single-user/' + user.id}>
												{user.firstName} {user.lastName}
											</Link>
										</td>

										<td>{user.email}</td>
										<td>{user.address}</td>
										{user.isAdmin && <td>Admin</td>}
										{user.isGuest && <td>Guest</td>}
										{!user.isAdmin && !user.isGuest && <td>User</td>}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => {
	return {
		users: state.users
	}
}

const mapDispatch = dispatch => {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	}
}

export default connect(mapState, mapDispatch)(AdminManageUsers)
