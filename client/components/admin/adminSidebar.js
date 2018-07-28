import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
	return (
		<div className="admin-sidebar">
			<Link to="/admin-mange-products">
				<h6>Manage Products</h6>
			</Link>
			<Link to="/new-product">
				<h6>Manage Users</h6>
			</Link>
			<Link to="/new-product">
				<h6>Manage Orders</h6>
			</Link>
		</div>
	)
}

export default AdminSidebar
