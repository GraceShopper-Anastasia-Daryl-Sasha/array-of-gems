import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProduct, removeProduct } from '../store/action-creators'

class AdminSingleProduct extends Component {
	componentDidMount() {
		this.props.fetchProduct()
	}

	render() {
		const { product } = this.props

		if (Object.keys(product).length < 1) {
			return <div>Data is loading...</div>
		} else {
			return (
				<div id="admin-single-product">
					<h2>Product View</h2>
					<h4>Title: {product.title}</h4>
					<p>Description: {product.description}</p>
					<ul className="list">
						{product.photos.map(photo => (
							<li key={photo.id}>
								<img src={photo.image} />
							</li>
						))}
					</ul>
					<p>Price: {product.price}</p>
					<p>Quantity: {product.quantity}</p>
					<p>Type: {product.type}</p>
					<p>Size: {product.size}</p>
					<p>Color: {product.color}</p>
					<h5>Reviews</h5>

					{product.reviews
						? product.reviews.map(review => (
								<div key={review.id}>
									<p>Title: {review.title}</p>
									<p>Rating: {review.rating}</p>
									<p>Comment: {review.comment}</p>
								</div>
						  ))
						: null}
					<Link to={'/update-product/' + product.id}>
						<button type="button" className="btn btn-info">
							Edit Product
						</button>
					</Link>
					<button
						type="button"
						className="btn btn-danger buttons"
						onClick={() => this.props.handleClick(product.id)}
					>
						Delete
					</button>
				</div>
			)
		}
	}
}

const mapState = state => {
	return {
		product: state.product
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const productId = ownProps.match.params.id
	return {
		handleClick(id) {
			// console.log('Campus', id);
			dispatch(removeProduct(productId, ownProps.history))
		},
		fetchProduct: () => dispatch(fetchProduct(productId))
	}
}

export default connect(mapState, mapDispatch)(AdminSingleProduct)
