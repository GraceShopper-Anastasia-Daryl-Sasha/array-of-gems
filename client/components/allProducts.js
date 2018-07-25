import React, { Component } from 'react'
import Sidebar from './sidebar'

export default class AllProducts extends Component {
	render() {
		const { products, categories } = this.props
		return (
			<div className="main-container">
				<Sidebar products={products} categories={categories} />
				<div>
					<ul>
						{products.map(product => <li key={product.id}>{product.title}</li>)}
					</ul>
				</div>
			</div>
		)
	}
}
