import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

import SearchBar from './searchBar'

// include cart
// my Account if logged in

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
	<div>
		<nav>
			<div className="logo">
				<img src="http://rgs.usu.edu/rd/wp-content/uploads/sites/17/2017/02/61326_154623_ruby_diamond_gem-300x300.png" />
				<Link to="/">
					<h3>Array Of Gems</h3>
				</Link>
			</div>

			<SearchBar />
			<div className="navLinks">
				<Link to="/products">Products</Link>
			</div>
			{isLoggedIn ? (
				<div className="navLinks">
					{/* The navbar will show these links after you log in */}
					<Link to="/myAccount">My Account</Link>
					{isAdmin && <Link to="/admin">Dashboard</Link>}
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<Link to="/cart">
						<img src="https://banner2.kisspng.com/20171217/337/shopping-cart-png-5a364b75338266.010470061513507701211.jpg" />
						<span>0</span>
					</Link>
				</div>
			) : (
				<div className="navLinks">
					{/* The navbar will show these links before you log in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/cart">
						<img src="https://banner2.kisspng.com/20171217/337/shopping-cart-png-5a364b75338266.010470061513507701211.jpg" />
						<span>0</span>
					</Link>
				</div>
			)}
		</nav>
		{/* <hr /> */}
	</div>
)

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
		isAdmin: state.user.isAdmin
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout())
		}
	}
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
