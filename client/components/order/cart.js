import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import CartTable from './cartTable'
import { clearCart, removeFromCart } from '../../store/action-creators'

class Cart extends Component {
	constructor() {
		super()
	}

	handleSubmit = evt => {
		evt.preventDefault()
		// await this.props.placeOrder(this.state);
		this.props.history.push(`/checkout`)
	}

	handleEdit = evt => product => {
		evt.preventDefault()
		const updatedProduct = { ...product }
		updatedProduct.quantity = Number(this.state.quantity)
		this.props.addToCart(updatedProduct)
		history.push('/cart')
	}

	handleClear = evt => {
		evt.preventDefault()
		this.props.clearCart()
	}

	// might need to make async event func
	handleRemove = productId => evt => {
		evt.preventDefault()
		this.props.removeFromCart(productId)
	}

	handleChange = evt => {
		evt.preventDefault()
		console.log(evt.target.value)
	}
	render() {
		if (!localStorage.getItem('cart')) {
			localStorage.setItem(
				'cart',
				JSON.stringify({
					products: [],
					orderTotal: 0
				})
			)
		}
		const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
		// const localStorageObj = JSON.parse(localStorage.getItem('cart'))
		return (
			<div className="cart">
				<h2>Cart</h2>
				{products.length === 0 ? (
					<div>
						<p>
							<span>There are currently no items in your cart</span>
						</p>
						<Link to="/products">
							<button type="submit" className="btn btn-primary">
								Keep Shopping
							</button>
						</Link>
					</div>
				) : (
					<CartTable
						products={products}
						orderTotal={orderTotal}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						handleEdit={this.handleEdit}
						handleClear={this.handleClear}
						handleRemove={this.handleRemove}
					/>
				)}
			</div>
		)
	}
}

const mapState = state => {
	return {
		products: state.order.products,
		orderTotal: state.order.orderTotal
	}
}

const mapDispatch = dispatch => {
	return {
		clearCart: () => dispatch(clearCart()),
		removeFromCart: productId => dispatch(removeFromCart(productId))
	}
}

export default connect(mapState, mapDispatch)(Cart)
