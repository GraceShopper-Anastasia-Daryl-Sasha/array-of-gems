import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'


// include cart 
// my Account if logged in

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>

    <nav>
      <div className="logo">
        <img src={'http://rgs.usu.edu/rd/wp-content/uploads/sites/17/2017/02/61326_154623_ruby_diamond_gem-300x300.png'} />
        <h1><Link to="/home">Array Of Gems</Link></h1>
      </div>
      {isLoggedIn ? (
        <div className="navLinks">
          {/* The navbar will show these links after you log in */}
          <img src={'https://banner2.kisspng.com/20171217/337/shopping-cart-png-5a364b75338266.010470061513507701211.jpg'} />
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div className="navLinks">
            {/* The navbar will show these links before you log in */}
            <img src={'http://simpleicon.com/wp-content/uploads/Shopping-Cart-10.png'} />
            <span>0</span>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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
    isLoggedIn: !!state.user.id
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
