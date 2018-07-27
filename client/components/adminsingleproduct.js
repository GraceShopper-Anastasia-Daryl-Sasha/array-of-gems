import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	fetchProduct,
	removeProduct,
	editPhoto
} from '../store/action-creators'
import AdminSingleImage from './adminsingleimage'

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
				<div id="admin-single-product">
					<h2>Product View</h2>
					<h4>Title: {product.title}</h4>
					<p>Description: {product.description}</p>
					<ul className="list">
						{product.photos.map(photo => (
							<AdminSingleImage
								key={photo.id}
								photo={photo}
								handleSubmit={this.handleSubmit}
							/>
						))}
					</ul>
					<div className="form-row">
						<div className="form-group col-sm-2">
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
						<div className="form-group col-sm-2">
							<label htmlFor="stock">Stock: </label>
							<input
								type="number"
								className="form-control"
								defaultValue={product.stock}
								name="stock"
								value={this.props.stock}
							/>
							<button
								type="button"
								className="btn btn-info"
								onSubmit={this.handleSubmit}
							>
								Update
							</button>
						</div>
						<div className="form-group col-sm-2">
							<label htmlFor="type">Type: </label>
							<input
								type="text"
								className="form-control"
								defaultValue={product.type}
								name="type"
								value={this.props.type}
							/>
							<button
								type="button"
								className="btn btn-info"
								onSubmit={this.handleSubmit}
							>
								Update
							</button>
						</div>
						<div className="form-group col-sm-2">
							<label htmlFor="size">Size: </label>
							<input
								type="text"
								className="form-control"
								defaultValue={product.size}
								name="size"
								value={this.props.size}
							/>
							<button
								type="button"
								className="btn btn-info"
								onSubmit={this.handleSubmit}
							>
								Update
							</button>
						</div>
						<div className="form-group col-sm-2">
							<label htmlFor="color">Color: </label>
							<input
								type="text"
								className="form-control"
								defaultValue={product.color}
								name="color"
								value={this.props.color}
							/>
							<button
								type="button"
								className="btn btn-info"
								onSubmit={this.handleSubmit}
							>
								Update
							</button>
						</div>
					</div>
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
						Delete Product
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
			dispatch(removeProduct(id, ownProps.history))
		},
		fetchProduct: () => dispatch(fetchProduct(productId))
	}
}

export default connect(mapState, mapDispatch)(AdminSingleProduct)
