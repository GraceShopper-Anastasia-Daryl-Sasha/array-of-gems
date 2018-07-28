import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductForm from './productform'
import AdminSidebar from './adminSidebar'
import { postProduct } from '../../store/action-creators'

class NewProduct extends Component {
	constructor() {
		super()
		this.state = {
			product: {
				title: '',
				description: '',
				price: 0.0,
				stock: 0,
				type: '',
				size: '',
				color: ''
			}
		}
	}

	render() {
		return (
			<div id="admin">
				<div className="row">
					<AdminSidebar />
					<div className="admin-view">
						<h3>Create New Product</h3>

						<div className="form">
							<ProductForm
								product={this.state.product}
								handleSubmit={this.props.handleSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			const title = evt.target.title.value
			const description = evt.target.description.value
			const price = evt.target.price.value
			const stock = evt.target.stock.value
			const type = evt.target.type.value
			const size = evt.target.size.value
			const color = evt.target.color.value
			const photo1 = evt.target.image1.value
			const photo2 = evt.target.image2.value
			const photo3 = evt.target.image3.value
			dispatch(
				postProduct(
					{
						product: { title, description, price, stock, type, size, color },
						photos: [photo3, photo2, photo1]
					},
					ownProps.history
				)
			)
		}
	}
}

export default connect(null, mapDispatch)(NewProduct)
