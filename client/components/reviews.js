import React, { Component } from 'react';

export default class SingleProduct extends Component {
  render () {
    const { reviews } = this.props
    return (
      <div className="info">
      <h3>Reviews</h3>
        {
          reviews ?
          reviews.map(review => {
            return (
              <div className='info' key={review.id}>
              <h5>{review.title}</h5>
              <div>Rating: {review.rating} <br/>
              {review.comment}</div>
            </div>
            )
          })
          : console.log('loading.')
        }
      </div>
    )
  }
}
