import React from 'react'
import AdminSidebar from './adminSidebar'

const AdminView = () => {
	return (
		<div id="admin">
			<div className="row">
				<AdminSidebar />
				<div className="admin-view">
					<h3>Dashboard</h3>
				</div>
			</div>
		</div>
	)
}

export default AdminView
