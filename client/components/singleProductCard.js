import React from 'react'
import { Link } from 'react-router-dom'

const SingleProductCard = props => {
	const { product } = props

	return (
		<div className="product">
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
					<button type="submit" className="btn btn-primary btn-sm search-btn">
						Select Options
					</button>
				</Link>
			</div>
		</div>
	)
}

export default SingleProductCard
