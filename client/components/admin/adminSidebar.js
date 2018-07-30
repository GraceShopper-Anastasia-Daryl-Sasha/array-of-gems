import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
	return (
		<div className="admin-sidebar">
			<Link to="/admin-manage-products">
				<h6>Manage Products</h6>
			</Link>
			<Link to="/admin-manage-users">
				<h6>Manage Users</h6>
			</Link>
			<Link to="/admin-manage-orders">
				<h6>Manage Orders</h6>
			</Link>
		</div>
	)
}

export default AdminSidebar
