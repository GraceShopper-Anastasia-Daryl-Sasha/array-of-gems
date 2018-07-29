import React, { Component } from 'react'
import Reviews from './reviews'
import { connect } from 'react-redux';
import history from '../history';
import { Link } from 'react-router-dom'
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

  handleSubmit = evt => {
    evt.preventDefault();
    const { product } = this.props
    const productToAdd = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: Number(this.state.quantity),
      subtotal: this.state.quantity * product.price,
      image: product.photos[0].image
    }
    this.props.addToCart(productToAdd)
    history.push('/cart')
  }

  render() {
    const { product } = this.props
    const { reviews } = product
    const { user } = this.props

    let num = product.stock
    if (num > 10) {
      num = 10
    }

    let quantityArr = []
    for (let i = 1; i <= num; i++) {
      quantityArr.push(i)
    }

    return (
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/products">Products</Link>
          </li>
        </ol>

        <div className="row ">
          <div className="col-sm">
            {
              product.photos ?
                <div className="single-product-images">
                  <div id="main-product-photo">
                    <img src={product.photos[0].image} />
                  </div>

                  <div id="thumbnails">
                    {
                      product.photos.map(photo => {
                        return <img key={photo.id} src={photo.image} />
                      })
                    }
                  </div>
                </div> : (
                  console.log('loading')
                )}
          </div>
          <div className="col-sm">
            <h1>{product.title}</h1>
            <h2>Description</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p><strong>Size:</strong> {product.size}
            </p>

            <div className="product-buttons">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Quantity: </label>
                  <select name="quantity" className="form-control" onChange={this.handleChange}>
                    {
                      quantityArr.map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary search-btn">Add to Cart</button>
              </form>
            </div>
          </div>
        </div>
        <Reviews reviews={reviews} product={product} user={user} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToCart: newProduct => dispatch(addToCart(newProduct))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
