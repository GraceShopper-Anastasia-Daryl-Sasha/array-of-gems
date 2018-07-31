import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import OrderSummary from './orderSummary'

class Checkout extends Component {
	constructor() {
		super()
	}

	handleSubmit = evt => {
		evt.preventDefault()
		const newOrder = {}
		console.log('TARGET', this.state)
		// await this.props.placeOrder(this.state);
		// this.props.history.push(`/checkout`)
	}

	render() {
		const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
		const { user } = this.props
		console.log('USER PROPS', this.props.user)

		return (
			<div className="my-account">
				{products.length === 0 ? (
					<Redirect to="/cart" />
				) : (
					<div>
						<div>
							{!user.id ? (
								<form>
									<label>
										Please <Link to="/login">Login</Link> or continue as guest:{' '}
									</label>
									<input />
									<button type="submit">Submit</button>
								</form>
							) : (
								<div className="cart">
									<h4>
										Welcome {user.firstName} {user.lastName}
									</h4>
									<button
										type="submit"
										className="btn btn-info"
										onClick={this.handleSubmit}
									>
										Submit Order
									</button>
								</div>
							)}
						</div>
						<div>
							<OrderSummary
								products={products}
								orderTotal={orderTotal}
								applyCode={this.applyCode}
								handleChange={this.handleChange}
							/>
						</div>
					</div>
				)}
			</div>
		)
	}
}

// const mapState = (state) => {
//     console.log(state)
//     return {
//         products: state.order.products,
//         orderTotal: state.order.orderTotal
//     }
// };

const mapState = state => {
	return {
		user: state.user
	}
}

export default connect(mapState)(Checkout)
