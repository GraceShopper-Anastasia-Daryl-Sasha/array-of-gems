import React, { Component } from 'react';
import { connect } from 'react-redux'
import NewReview from './newReview'
import { postReview } from '../store/action-creators'

class Reviews extends Component {

  render () {
    const { reviews } = this.props
    const { isLoggedIn } = this.props
    const { product } = this.props

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
        <br />
      {
        isLoggedIn && (
          <NewReview product={product} handleSubmit={this.props.handleSubmit} />
        )
      }
      </div>
    )
  }
}

const mapState = state => {
	return {
    isLoggedIn: !!state.user.id
	}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const title = evt.target.title.value
      const rating = evt.target.rating.value
      const comment = evt.target.comment.value
      const userId = ownProps.user.id
      const productId = ownProps.product.id
      dispatch(postReview(
        {title, rating, comment, userId, productId}
      ))
      this.formRef.reset()
    }
  }
}

export default connect(mapState, mapDispatch)(Reviews)
