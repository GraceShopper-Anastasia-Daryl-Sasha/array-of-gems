import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProduct from './singleProduct'
import { fetchProduct } from '../store/action-creators'

class GetProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct()
  }

  render() {
    const product = this.props.product
    return (
      <SingleProduct product={product} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const productId = ownProps.match.params.productId
  return {
    fetchProduct: () => {
      const thunk = fetchProduct(productId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetProduct)
