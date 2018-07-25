import React, { Component } from 'react'
import Sidebar from './sidebar'
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