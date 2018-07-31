import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrder } from '../../store/action-creators'
import AdminSidebar from './adminSidebar'

class AdminSingleOrder extends Component {
	componentDidMount() {
		this.props.fetchOrder()
	}

	render() {
		const { orderview } = this.props

		if (Object.keys(orderview).length < 1) {
			return <div>Data is loading...</div>
		} else {
			return (
				<div id="admin">
					<div className="row">
						<AdminSidebar />
						<div className="admin-view">
							<div id="admin-single-product">
								<h2>Order Details</h2>
								<p>
									Customer's info:<br />
									{orderview.user.firstName} {orderview.user.lastName}
								</p>
								<p>
									Shipping address:<br />
									{orderview.user.firstName} {orderview.user.lastName} <br />
									{orderview.user.address}
								</p>
								<p />
								<p>
									Order status: <br /> {orderview.status}
								</p>

								<div className="form-group">
									<form onSubmit={this.props.handleSubmit}>
										<div className="form-group">
											<label htmlFor="campus">Order Status</label>
											<select
												className="form-control"
												defaultValue={orderview.status}
												name="status"
											>
												<option value="reated">Created</option>
												<option value="pending">Pending</option>
												<option value="shipped">Shipped</option>
												<option value="delivered">Delivered</option>
											</select>
										</div>
										<button type="submit" className="btn btn-info">
											Update Status
										</button>
									</form>
								</div>

								<table className="table table-striped table-hover">
									<thead>
										<tr>
											<th scope="col">Product Title</th>
											<th scope="col">Quantity</th>
											<th scope="col">Price</th>
											<th scope="col" />
										</tr>
									</thead>
									<tbody>
										{orderview.products.map(product => (
											<tr key={product.id}>
												<td>
													<Link to={'/admin-single-product/' + product.id}>
														{product.title}
													</Link>
												</td>
												<td>
													{/* {orderview.quantity / orderview.products.length} */}
													{product.OrderProducts.productQuantity}
												</td>
												<td>${product.price}</td>
												<td />
											</tr>
										))}
										<tr>
											<td />
											<td />
											<td>Shipping: </td>
											<td>${orderview.shippingPrice}</td>
										</tr>
										<tr>
											<td />
											<td />
											<td>Total: </td>
											<td>${orderview.orderTotal}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

const mapState = state => {
	return {
		orderview: state.orderview
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const orderId = ownProps.match.params.id
	return {
		fetchOrder: () => dispatch(fetchOrder(orderId)),
		handleSubmit(evt) {
			evt.preventDefault()
			console.log('status ', evt.target.status.value)
		}
	}
}

export default connect(mapState, mapDispatch)(AdminSingleOrder)
