import React, { Component } from 'react'
import { connect } from 'react-redux'

class AdminSingleProduct extends Component {
	componentDidMount() {}

	render() {
		return (
			<div>
				<h2>Product View</h2>
			</div>
		)
	}
}

const mapState = state => {
	return {
		state: state.product
	}
}

const mapDispatch = dispatch => {
	return {}
}

export default connect(mapState, mapDispatch)(AdminSingleProduct)
