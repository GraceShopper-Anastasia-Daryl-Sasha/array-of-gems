import React, { Component } from 'react'
import Sidebar from './sidebar'
import { Link } from 'react-router-dom'
import SingleProductCard from './singleProductCard'

const AllProducts = (props) => {

	const { products, categories } = props
	let activeProducts = [];
	if (categories.length === 0) {
		activeProducts = products
	} else {
		products.forEach(product => {
			// categories.color.forEach(color => {
			// 	if (product.color === color && product.type) 
			// })
			if (categories.color.includes(product.color)) {
				activeProducts.push(product);
			} else if (categories.type.includes(product.type) && activeProducts.includes(product)) {
				activeProducts.push(product);
			} else if (categories.size.includes(product.size) && activeProducts.includes(product)) {
				activeProducts.push(product);
			}

		})

	}

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
    
	if (categories.length >= 1 && activeProducts.length === 0) {
		console.log("NO PRODUCTS")
	}


	console.log(props)
	console.log('ACTIVE PRODUCTS', activeProducts)

	return (

		<div className="products-box" >
			<Sidebar products={products} categories={categories} />
			<div className="products">
				{categories.length >= 1 && activeProducts.length === 0
					? <div><h2>Sorry, that search resulted in zero products.</h2></div>
					: activeProducts.map(product => <SingleProductCard product={product} key={product.id} />)}
			</div>
		</div>

	)

}

export default AllProducts