import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MainHome, Login, Signup, UserHome } from './components'
import AllProducts from './components/allProducts-home'
import SingleProduct from './components/singleProduct-home'
import { me } from './store'
import AdminView from './components/adminview'
import NewProduct from './components/newproduct'
import AdminSingleProduct from './components/adminsingleproduct'
import UpdateProduct from './components/updateproduct'
import Cart from './components/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props
		console.log('IsLoggedIn', isLoggedIn)
		return (
			<div className="main-container">
				<Switch>
					{/* Routes placed here are available to all visitors */}
					<Route exact path="/" component={MainHome} />
					<Route path="/cart" component={Cart} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route exact path="/products" component={AllProducts} />
					<Route path="/products/:productId" component={SingleProduct} />
					{isLoggedIn && (
						<Switch>
							{/* Routes placed here are only available after logging in */}
							<Route path="/home" component={UserHome} />
							<Route path="/admin" component={AdminView} />
							<Route path="/new-product" component={NewProduct} />
							<Route
								path="/admin-single-product/:id"
								component={AdminSingleProduct}
							/>
							<Route path="/update-product/:id" component={UpdateProduct} />
						</Switch>
					)}
					{/* Displays our Login component as a fallback */}
					<Route component={MainHome} />
				</Switch>
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		}
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
