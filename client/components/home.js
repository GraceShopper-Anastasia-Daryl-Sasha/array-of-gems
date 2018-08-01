import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import SearchBar from './searchBar'
import Carousel from 'react-image-carousel'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/action-creators'

const images = [
	'https://cdn.shopify.com/s/files/1/0885/3178/t/9/assets/1626x600_tradition_gemstones.jpg?13357309008435823644',
	'https://www.energymuse.com/blog/wp-content/uploads/2015/09/purplegemstones-1050x700.jpg',
	'http://lifematspro.com/wp-content/uploads/2016/04/Amethyst-Crystal-Healing_image1.jpg',
	'https://cdn7.bigcommerce.com/s-91397/images/stencil/original/products/1422/3021/Fluorite_gemstones_white_magick_alchemy_1__68418.1362590063.jpg?c=2&imbypass=on',
	'https://www.sagegoddess.com/wp-content/uploads/2017/03/Broken-Gemstones-Sage-Goddess-Blog-FB-Share-1024x538.jpg.optimal.jpg'
]

class MainHome extends Component {
	componentDidMount() {
		this.props.fetchProducts()
	}

	render() {
		const { products } = this.props

		const recentProducts = products.splice(0, 6)
		return (
			<div className="main-home">
				<div className="my-carousel">
					<Carousel
						images={images}
						// thumb={true}
						loop={true}
						autoplay={4000}
					/>
				</div>

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
