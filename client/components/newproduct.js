import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductForm from './productform'
import { postProduct } from '../store/action-creators'

class NewProduct extends Component {
	constructor() {
		super()
		this.state = {
			product: {
				title: '',
				description: '',
				price: 0.0,
				quantity: 0,
				type: '',
				size: '',
				color: ''
			}
		}
	}

	render() {
		return (
			<div id="form">
				<h3>Create New Product</h3>
				<div className="form">
					<ProductForm
						product={this.state.product}
						handleSubmit={this.props.handleSubmit}
					/>
				</div>
			</div>
		)
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			console.log(evt)
			const title = evt.target.title.value
			const description = evt.target.description.value
			const price = evt.target.price.value
			const quantity = evt.target.quantity.value
			const type = evt.target.type.value
			const size = evt.target.size.value
			const color = evt.target.color.value
			dispatch(
				postProduct(
					{ title, description, price, quantity, type, size, color },
					ownProps.history
				)
			)
		}
	}
}

export default connect(null, mapDispatch)(NewProduct)
