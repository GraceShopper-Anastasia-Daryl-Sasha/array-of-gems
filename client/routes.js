import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MainHome, Login, Signup, UserHome } from './components'
import AllProducts from './components/allProducts-home'
import SingleProduct from './components/singleProduct-home'
import { me } from './store'
import Cart from './components/order/cart'
import Checkout from './components/order/checkout'
import Reviews from './components/reviews'
import AdminView from './components/admin/adminview'
import AdminManageProducts from './components/admin/adminmanageproducts'
import NewProduct from './components/admin/newproduct'
import AdminSingleProduct from './components/admin/adminsingleproduct'
import UpdateProduct from './components/admin/updateproduct'
import AdminManageUsers from './components/admin/adminmanageusers'
import AdminManageOrders from './components/admin/adminmanageorders'
import AdminSingleOrder from './components/admin/adminsingleorder'
import AdminSingleUser from './components/admin/adminsingleuser'
/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn, isAdmin } = this.props
		console.log('IsLoggedIn', isLoggedIn)
		console.log('Is admin', isAdmin)
		return (
			<div className="main-container">
				<Switch>
					{/* Routes placed here are available to all visitors */}
					<Route exact path="/" component={MainHome} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route exact path="/products" component={AllProducts} />
					<Route path="/products/:productId" component={SingleProduct} />
					<Route path="/products/:productId/reviews" component={Reviews} />
					<Route path="/cart" component={Cart} />
					<Route path="/checkout" component={Checkout} />
					{isLoggedIn && (
						<Switch>
							{/* Routes placed here are only available after logging in */}
							<Route path="/home" component={UserHome} />
							{isAdmin && (
								<Switch>
									<Route path="/admin" component={AdminView} />
									<Route
										path="/admin-manage-products"
										component={AdminManageProducts}
									/>
									<Route
										path="/admin-manage-users"
										component={AdminManageUsers}
									/>
									<Route
										path="/admin-manage-orders"
										component={AdminManageOrders}
									/>
									<Route path="/new-product" component={NewProduct} />
									<Route
										path="/admin-single-product/:id"
										component={AdminSingleProduct}
									/>
									<Route
										path="/admin-single-order/:id"
										component={AdminSingleOrder}
									/>
									<Route
										path="/admin-single-user/:id"
										component={AdminSingleUser}
									/>

									<Route path="/update-product/:id" component={UpdateProduct} />
								</Switch>
							)}
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
		isLoggedIn: !!state.user.id,
		isAdmin: state.user.isAdmin
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
