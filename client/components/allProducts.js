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
		// filter logic based on side bar category choices
		// OR within any category, AND across categories
		products.forEach(product => {
			let isFirstEntry = true;
			for (let key in categories) {
				if (categories[key].length > 0) {
					if (isFirstEntry) {
						if (categories[key].includes(product[key])) {
							activeProducts.push(product)
						}
						isFirstEntry = false;
					} else if (activeProducts.includes(product) && !categories[key].includes(product[key])) {
						activeProducts.splice(activeProducts.indexOf(product), 1)
					}
				}

			}

		})
	}

	if (categories.length >= 1 && activeProducts.length === 0) {
		console.log("NO PRODUCTS")
	}

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