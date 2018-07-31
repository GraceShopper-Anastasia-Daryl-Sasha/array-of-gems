import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUser } from '../../store/action-creators'

class MyAccount extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		const { userInfo } = this.props
		console.log('myAccountUser')
		if (Object.keys(userInfo).length < 1) {
			return <div>Data is loading...</div>
		} else {
			return (
				<div className="my-account">
					<h3>My Account</h3>
					<h6>Order History</h6>
					{userInfo.orders.length !== 0 ? (
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th scope="col">Order number</th>
									<th scope="col">Status</th>
									<th scope="col">Order quantity</th>
									<th scope="col">Shipping price</th>
									<th scope="col">Total</th>
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
										</tr>
									))}
							</tbody>
						</table>
					) : (
						<p>You haven't made any orders yet!</p>
					)}
				</div>
			)
		}
	}
}

const mapState = (state, ownProps) => {
	return {
		userInfo: state.userInfo,
		id: ownProps.id
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const userId = ownProps.id
	console.log('My account, userId ', userId)
	return {
		fetchUser: () => dispatch(fetchUser(userId))
	}
}

export default connect(mapState, mapDispatch)(MyAccount)
