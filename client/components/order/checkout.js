import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import OrderSummary from './orderSummary'
import { postOrder, clearCart, checkingOut } from '../../store/action-creators'
import CheckoutForm from './checkoutForm'
import AddressForm from './addressForm'
import { Elements, StripeProvider } from 'react-stripe-elements'

class Checkout extends Component {
    constructor() {
        super()
        this.state = {
            complete: false,
            addressEntered: false
        }
        // this.submit = this.submit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleSubmit = evt => {
        evt.preventDefault()
        const cart = JSON.parse(localStorage.getItem('cart'))
        const newOrder = {
            order: { orderTotal: cart.orderTotal, quantity: cart.quantity },
            cart: cart.products,
            userEmail: this.props.user.email,
            userAddress: this.props.user.address
        }
        this.props.postOrder(newOrder)
        this.setState({ addressEntered: true })
    }

    handleClick() {
        const check = true
        checkingOut({ userCheckingOut: check })
    }


    render() {
        const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
        const { user } = this.props

        if (this.state.complete) return <h1>Purchase Complete</h1>
        return (
            <div className="my-account">
                {products.length === 0 ? (
                    <Redirect to="/cart" />
                ) : (
                        <div className="row">
                            <div className="col-sm">
                                {!user.id ? (
                                    <div className="cart cart-login">
                                        <form>
                                            <h5>
                                                Please
											<Link to="/login">
                                                    <button
                                                        type="submit"
                                                        onClick={this.handleClick}
                                                        className="btn btn-info"
                                                    >
                                                        Login
												</button>
                                                </Link>{' '}
                                                or continue as guest:{' '}
                                            </h5>
                                            <input />
                                            <button type="submit" className="btn btn-info btn-sm">
                                                Submit
										</button>
                                        </form>
                                    </div>
                                ) : (
                                        <div className="cart">
                                            <h4>
                                                Welcome {user.firstName}
                                            </h4>


                                            {!this.state.addressEntered
                                                ? <AddressForm handleSubmit={this.handleSubmit} />
                                                :
                                                <div>
                                                    <CheckoutForm
                                                        name={user.firstName + '' + user.lastName}
                                                        description={user.firstName + "'s Order"}
                                                        amount={orderTotal}
                                                        clearCart={this.props.clearCart}
                                                    />

                                                </div>
                                            }


                                        </div>
                                    )}
                            </div>
                            <div className="col-sm">
                                <OrderSummary
                                    products={products}
                                    orderTotal={orderTotal}
                                    applyCode={this.applyCode}
                                    handleChange={this.handleChange}

                                />
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        postOrder: newOrder => dispatch(postOrder(newOrder, ownProps.history)),
        clearCart: () => dispatch(clearCart()),
        checkingOut: check => dispatch(checkingOut(check))
    }
}

export default connect(mapState, mapDispatch)(Checkout)
