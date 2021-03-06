import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllProducts from './allProducts'
import { fetchProducts } from '../store/action-creators'

class GetProducts extends Component {
	componentDidMount() {
		this.props.fetchProducts()
	}

	render() {
		const products = this.props.products
		const categories = this.props.categories
		return <AllProducts products={products} categories={categories} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GetProducts)
