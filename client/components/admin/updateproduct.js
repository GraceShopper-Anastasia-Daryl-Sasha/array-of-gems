import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProduct } from '../../store/action-creators'
import ProductForm from './productform'
import AdminSidebar from './adminSidebar'

class UpdateProduct extends Component {
	render() {
		const { product } = this.props
		return (
			<div id="admin">
				<div className="row">
					<AdminSidebar />
					<div className="admin-view">
						<h3>Update Product</h3>

						<div className="form">
							<ProductForm
								product={product}
								handleSubmit={this.props.handleSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state, ownProps) => {
	return {
		product: state.product,
		id: ownProps.match.params.id
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const productId = ownProps.match.params.id
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

			dispatch(
				editProduct(
					{
						productId,
						product: {
							title,
							description,
							price,
							stock,
							type,
							size,
							color
						}
					},
					ownProps.history
				)
			)
		}
	}
}

export default connect(mapState, mapDispatch)(UpdateProduct)
