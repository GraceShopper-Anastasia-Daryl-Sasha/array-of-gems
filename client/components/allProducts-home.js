import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllProducts from './allProducts'
import { fetchProducts } from '../store/product'

class GetProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const allProducts = this.props.allProducts
    const selectedCategories = this.props.selectedCategories
    console.log(allProducts)
    return (
      <AllProducts allProducts={allProducts} selectedCategories={selectedCategories} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    selectedCategories: state.product.selectedCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      const thunk = fetchProducts()
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetProducts)
