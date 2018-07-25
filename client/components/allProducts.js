import React, { Component } from 'react'
import Sidebar from './sidebar'
import { Link } from 'react-router-dom'

export default class AllProducts extends Component {
	render() {
		const { products, categories } = this.props
		return (
			<div className="main-container">
				<Sidebar products={products} categories={categories} />
				<div>
				{
                        products.map(product => {
                            return (
                                <div className="product" key={product.id}>
                                    <div className="product-image">
                                        <img src={product.photo} />
                                    </div>
                                    <div className="product-info">
                                        <Link to={`/products/${product.id}`}>{product.title}</Link> <br />
                                        <a>Price: ${product.price}</a>
                                    </div>
                                    <div className='product-buttons'>
                                        <button>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })
                    }
				</div>
			</div>
		)
	}
}
