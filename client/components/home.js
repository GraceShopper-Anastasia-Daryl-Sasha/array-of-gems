import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/action-creators'

class MainHome extends Component {
	componentDidMount() {
		this.props.fetchProducts()
	}

	render() {
		const { products } = this.props

		const recentProducts = products.splice(0, 6)
		return (
			<div className="main-home">
				<Carousel />
				<div className="products-container">
					<h2>Recent Products</h2>
					<div className="products">
						{recentProducts.map(product => (
							<div className="product" key={product.title}>
								<div className="product-image">
									<img src={product.photos[0].image} />
								</div>
								<div className="product-info">
									<p>
										{product.title}
										<br />
										Price: ${product.price}
									</p>
								</div>
								<div className="product-buttons">
									<Link to={`/products/${product.id}`}>
										<button type="submit" className="btn btn-primary btn-sm">
											Select options
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.products,
		categories: state.categories
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => {
			const thunk = fetchProducts()
			dispatch(thunk)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHome)
