import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { applyDiscount } from '../../store/action-creators'

class OrderSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
		// this.input = React.createRef();
	}

	handleSubmit = evt => {
		evt.preventDefault()
		const code = this._input.value
		const isCodeApplied = JSON.parse(localStorage.getItem('cart')).code
		if (code === 'Boone' && !isCodeApplied) {
			this.props.applyDiscount(code)
			this.setState({ message: 'Code has been successfully applied.' })
		} else if (code === 'Boone' && isCodeApplied) {
			this.setState({ message: 'That code has already been applied' })
		} else {
			this.setState({ message: 'Code is not valid.' })
		}
	}

	render() {
		const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
		return (
			<div className="cart">
				<h3>Items in your cart</h3>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th scope="col" />
							<th scope="col">Product Title</th>
							<th scope="col">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.productId} className="tr">
								<td>
									<img src={product.image} />
								</td>
								<td>
									{product.quantity} x {product.title}
								</td>
								<td>${product.subtotal}</td>
							</tr>
						))}
					</tbody>
				</table>
				<p>Shipping: $2.99</p>
				<p>Total: ${(Number(orderTotal) + 2.99)}</p>
				<form onSubmit={this.handleSubmit}>
					{/* coupons within stripe only allow for recurring subscriptions, will need to handle otherwise */}
					<label>Discount Code</label>
					<input type="text" ref={input => (this._input = input)} />
					<input
						type="submit"
						value="Apply"
						className="btn btn-info btn-sm order-summary"
					/>
				</form>
				<span>{this.state.message}</span>
			</div>
		)
	}
}

const mapState = state => {
	discountedTotal = state.orderTotal
}

const mapDispatch = dispatch => {
	return {
		applyDiscount: code => dispatch(applyDiscount(code))
	}
}

export default connect(null, mapDispatch)(OrderSummary)
