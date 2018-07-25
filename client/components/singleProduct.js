import React, { Component } from 'react';

export default class SingleProduct extends Component {
  render () {
    const { product } = this.props
    console.log(product)
    return (
      <div className="product">
        <div className="single-product-images">
        {
          product.photos ? product.photos.map(photo => {
            return <img key={photo} src={photo} />
          }) : console.log('loading.')
        }
        </div>
        <div className="product-info">
          <h1><a>{product.title}</a></h1> <br />
          <h2>Description</h2>
          <a>{product.description}</a>
          <a>Price: ${product.price}</a>
        </div>
        <div className='product-buttons'>
            <form>
              <input type='text' name='quantity' value='0' />
              <input type='submit' value='Submit' />
            </form>
            <button>Add to Cart</button>
        </div>
      </div>
    )
  }
}
