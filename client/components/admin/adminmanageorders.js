import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../../store/action-creators'
import AdminSidebar from './adminSidebar'

class AdminManageOrders extends Component {
	componentDidMount() {
		this.props.fetchOrders()
	}
	render() {
		const { orders } = this.props
		console.log('Orders', orders)
		return (
			<div id="admin">
				<div className="row">
					<AdminSidebar />
					<div className="admin-view">
						<h3>Manage Orders</h3>
						<div className="top-view">
							{/* <Link to="/new-product">
								<button type="submit" className="btn btn-primary">
									Add new product
								</button>
							</Link> */}
						</div>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th scope="col">Id</th>
									<th scope="col">Status</th>
									<th scope="col">Qunatity</th>
									<th scope="col">Shipping Price</th>
									<th scope="col">Order Total</th>
									<th scope="col">Date</th>
									<th scope="col">User</th>
									<th scope="col">Details</th>
								</tr>
							</thead>
							<tbody>
								{orders.map(order => (
									<tr key={order.id}>
										<th scope="row">{order.id}</th>
										<td>{order.status}</td>
										<td>{order.quantity}</td>

										<td>${order.shippingPrice}</td>
										<td>${order.orderTotal}</td>
										<td>{new Date(order.datePlaced).toJSON().slice(0, 10)}</td>
										<td>{order.user.email}</td>
										<td>
											<Link to={`/admin-single-order/${order.id}`}>
												<button
													type="submit"
													className="btn btn-primary btn-sm"
												>
													View Details
												</button>
											</Link>
										</td>
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
		orders: state.orders
	}
}

const mapDispatch = dispatch => {
	return {
		fetchOrders: () => dispatch(fetchOrders())
	}
}

export default connect(mapState, mapDispatch)(AdminManageOrders)
