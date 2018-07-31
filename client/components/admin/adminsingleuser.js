import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUser, removeReview, editRole } from '../../store/action-creators'
import AdminSidebar from './adminSidebar'

class AdminSingleUser extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		const { userInfo } = this.props
		console.log('AdminSingleUser')
		if (Object.keys(userInfo).length < 1) {
			return <div>Data is loading...</div>
		} else {
			return (
				<div id="admin">
					<div className="row">
						<AdminSidebar />
						<div className="admin-view">
							<div id="admin-single-product">
								<h2>User Information</h2>
								<p>
									First name:<br />
									{userInfo.firstName} {userInfo.lastName}
								</p>
								<p>
									Shipping address:<br />
									{userInfo.address}
								</p>
								<p>
									Email: <br />
									{userInfo.email}
								</p>
								{!userInfo.isAdmin ? <p>Role: User</p> : <p>Role: Admin</p>}
								{userInfo.isGuest && <p>Role: Guest</p>}

								<div className="form-group">
									<form onSubmit={this.props.handleSubmit}>
										<div className="form-group">
											<label htmlFor="campus">Role</label>
											<select className="form-control" name="role">
												<option value="admin">Admin</option>
												<option value="user">User</option>
											</select>
										</div>
										<button type="submit" className="btn btn-info">
											Update
										</button>
									</form>
								</div>
								<table className="table table-striped table-hover">
									<thead>
										<tr>
											<th scope="col">Order number</th>
											<th scope="col">Status</th>
											<th scope="col">Order quantity</th>
											<th scope="col">Shipping price</th>
											<th scope="col">Total</th>
											<th scope="col">Discount</th>
										</tr>
									</thead>
									<tbody>
										{userInfo.orders &&
											userInfo.orders.map(order => (
												<tr key={order.id}>
													<td>{order.id}</td>
													<td>{order.status}</td>
													<td>{order.quantity}</td>
													<td>${order.shippingPrice}</td>
													<td>${order.orderTotal}</td>
													<td>{order.discountCode}</td>
												</tr>
											))}
									</tbody>
								</table>

								<p>Reviews:</p>

								{userInfo.reviews &&
									userInfo.reviews.map(review => (
										<div className="card card-reviews" key={review.id}>
											<div className="card-body">
												<h5 className="card-title">{review.title}</h5>
												<h6 className="card-subtitle mb-2 text-muted">
													Rating: {review.rating}
												</h6>
												<p className="card-text">{review.comment}</p>
												<Link to={'/admin-single-product/' + review.productId}>
													<p>Product</p>
												</Link>
												<button
													type="button"
													className="btn btn-danger buttons"
													onClick={() => this.props.handleClick(review.id)}
												>
													Delete Review
												</button>
											</div>
										</div>
									))}
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
		userInfo: state.userInfo
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const userId = ownProps.match.params.id
	return {
		fetchUser: () => dispatch(fetchUser(userId)),
		handleClick(id) {
			dispatch(
				removeReview({ userId: +userId, reviewId: id }, ownProps.history)
			)
		},
		handleSubmit(evt) {
			evt.preventDefault()
			const role = evt.target.role.value
			let result
			if (role === 'admin') {
				result = true
			} else {
				result = false
			}
			dispatch(editRole({ id: +userId, isAdmin: result }, ownProps.history))
		}
	}
}

export default connect(mapState, mapDispatch)(AdminSingleUser)
