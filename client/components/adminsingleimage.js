import React from 'react'
import { connect } from 'react-redux'

const AdminSingleImage = props => {
	const { photo } = props
	return (
		<li>
			<div className="card">
				<img className="card-img-top" src={photo.image} />
				<div className="card-body">
					{/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
				</div>
			</div>
		</li>
	)
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		handleSubmit(evt) {
			evt.preventDeafult()
			console.log(evt.target)
		}
	}
}

export default connect(null, mapDispatch)(AdminSingleImage)
