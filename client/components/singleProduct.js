import React, { Component } from 'react';
import Reviews from './reviews'

export default class SingleProduct extends Component {
  render () {
    const { product } = this.props
    const reviews = this.props.product.reviews
    console.log(reviews)
    return (
      <div>

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
          <a>{product.description}</a>
          <a>Price: ${product.price}</a>
        </div>
        <div className='product-buttons'>
            <form>
              <select name="size">
                <option value="1.0 mm">1.0 mm</option>
              </select> <br/>
              <input type='text' name='quantity' value='0' />
              <input type='submit' value='Submit' />
            </form>
            <button>Add to Cart</button>
        </div>
        <Reviews reviews={reviews} />
      </div>
    )
  }
}
