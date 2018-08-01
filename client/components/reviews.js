import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewReview from './newReview'
import { postReview } from '../store/action-creators'

class Reviews extends Component {
	render() {
		const { reviews, isLoggedIn, product } = this.props

		function mapStars(rating) {
			let stars = []
			for (let i = 0; i < rating; i++) {
				stars.push(
					<img
						src="https://www.freeiconspng.com/uploads/clip-art-star-png--clipart-best-5.png"
						key={i}
					/>
				)
			}
			return stars
		}

		return (
			<div className="reviews">
				<h3>Reviews</h3>
				{isLoggedIn && (
					<NewReview product={product} handleSubmit={this.props.handleSubmit} />
				)}
				<br />
				{reviews &&
					reviews.map(review => {
						return (
							<div className="review-item" key={review.id}>
								<h5>{review.title}</h5>
								{review.user && (
									<div>
										<img src={review.user.userImage} />
										<p>{review.user.firstName}</p>
									</div>
								)}

								{mapStars(review.rating)}
								<p>{review.comment}</p>
							</div>
						)
					})}
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
			dispatch(postReview({ title, rating, comment, userId, productId }))
		}
	}
}

export default connect(mapState, mapDispatch)(Reviews)
