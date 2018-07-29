import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	fetchProduct,
	removeProduct,
	editPhoto
} from '../../store/action-creators'
import AdminSingleImage from './adminsingleimage'
import AdminSidebar from './adminSidebar'

class AdminSingleProduct extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		this.props.fetchProduct()
	}

	handleSubmit(evt) {
		evt.preventDefault()
		const photo = evt.target.image.value
		console.log('photo ', photo)
	}

	render() {
		const { product } = this.props

		if (Object.keys(product).length < 1) {
			return <div>Data is loading...</div>
		} else {
			return (
				<div id="admin">
					<div className="row">
						<AdminSidebar />
						<div className="admin-view">
							<div id="admin-single-product">
								<h2>Product View</h2>
								<p>
									Title:<br />
									{product.title}
								</p>
								<p>
									Description:<br /> {product.description}
								</p>
								<p>Type: {product.type}</p>
								<p>Size: {product.size}</p>
								<p>Color: {product.color}</p>
								<p>Stock: {product.stock}</p>
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
									Delete Product
								</button>
								<div className="form-row">
									<div className="form-group col-sm-4">
										<label htmlFor="price">Price: </label>
										<input
											type="number"
											className="form-control"
											defaultValue={product.price}
											name="price"
											value={this.props.price}
										/>
										<button
											type="button"
											className="btn btn-info"
											onSubmit={this.handleSubmit}
										>
											Update
										</button>
									</div>
									<div className="row">
										<ul className="list">
											{product.photos.map(photo => (
												<AdminSingleImage
													key={photo.id}
													photo={photo}
													handleSubmit={this.handleSubmit}
												/>
											))}
										</ul>
									</div>
								</div>
								<h5>Reviews</h5>
								{product.reviews &&
									product.reviews.map(review => (
										<div key={review.id}>
											<p>Title: {review.title}</p>
											<p>Rating: {review.rating}</p>
											<p>Comment: {review.comment}</p>
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
		product: state.product
	}
}

const mapDispatch = (dispatch, ownProps) => {
	const productId = ownProps.match.params.id
	return {
		handleClick(id) {
			dispatch(removeProduct(id, ownProps.history))
		},
		fetchProduct: () => dispatch(fetchProduct(productId))
	}
}

export default connect(mapState, mapDispatch)(AdminSingleProduct)
