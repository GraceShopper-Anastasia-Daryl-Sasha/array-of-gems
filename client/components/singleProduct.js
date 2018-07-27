import React, { Component } from 'react'
import Reviews from './reviews'
import { connect } from 'react-redux';
import history from '../history';
import { addToCart } from "../store/action-creators"


class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  handleChange = (evt) => {
    this.setState({
      quantity: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { product } = this.props
    const productToAdd = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: Number(this.state.quantity),
      subtotal: this.state.quantity * product.price,
      // image: product.photos[0]
    }
    this.props.addToCart(productToAdd)
    history.push('/cart')
  }

  render() {
    const { product } = this.props
    const { reviews } = product

    let num = product.stock
    if (num > 10) { num = 10 }

    let quantityArr = []
    for (let i = 1; i <= num; i++) {
      quantityArr.push(i)
    }

    return (
      <div className="single-product-main">
        {
          product.photos ?
            <div className="single-product-images">
              <div id="main-product-photo">
                <img src={product.photos[0]} />
              </div>

              <div id="thumbnails">
                {
                  product.photos.map(photo => {
                    return <img key={photo} src={photo} />
                  })
                }
              </div>
            </div> : console.log('loading')

        }


        <div className="product-info">
          <h1><a>{product.title}</a></h1> <br />
          <h2>Description</h2>
          <a>{product.description}</a> <br />
          <a><strong>Price:</strong> ${product.price}</a><br />
          <a><strong>Size:</strong> {product.size}</a><br />
          <h2><a>{product.title}</a></h2> <br />
          <h4>Description</h4>
          <a>{product.description}</a> <br />
          <a>Price: ${product.price}</a>
        </div>
        <div className='product-buttons'>

          <form onSubmit={this.handleSubmit}>
            <label>Quantity: </label>
            <select name="quantity" onChange={this.handleChange}>
              {
                quantityArr.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))
              }
            </select>
            <button type="submit">Add to Cart</button>
          </form>
        </div>
        <Reviews reviews={reviews} />
      </div>

    )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addToCart: (newProduct) => dispatch(addToCart(newProduct))
  }
}

export default connect(null, mapDispatch)(SingleProduct)