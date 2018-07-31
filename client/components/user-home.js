import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyAccount from './user/myAccount'

/**
 * COMPONENT
 */
export const UserHome = props => {
	const { id, firstName } = props

	return (
		<div className="main-home">
			<h3>Welcome, {firstName}!</h3>
			<MyAccount id={id} />
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		firstName: state.user.firstName,
		id: state.user.id
	}
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
	email: PropTypes.string
}
