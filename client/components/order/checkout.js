import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import OrderSummary from "./orderSummary";
import { postOrder, clearCart } from "../../store/action-creators"
import CheckoutForm from './checkoutForm'

class Checkout extends Component {
    constructor() {
        super()
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let response = await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });

        if (response.ok) this.setState({ complete: true });
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const cart = JSON.parse(localStorage.getItem('cart'))
        const newOrder = {
            "order": { "orderTotal": cart.orderTotal, "quantity": cart.quantity },
            "cart": cart.products,
            "userEmail": this.props.user.email
        }
        this.props.postOrder(newOrder);
        this.props.clearCart();

    }

    render() {
        const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
        const { user } = this.props

        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return (
            <div className="my-account">
                {products.length === 0 ? (
                    <Redirect to="/cart" />
                ) : (
                        <div>
                            <div>
                                {!user.id ? (
                                    <form>
                                        <label>
                                            Please <Link to="/login">Login</Link> or continue as guest:{' '}
                                        </label>
                                        <input />
                                        <button type="submit">Submit</button>
                                    </form>
                                ) : (
                                        <div className="cart">
                                            <h4>
                                                Welcome {user.firstName} {user.lastName}
                                            </h4>

                                            <CheckoutForm name={user.firstName + '' + user.lastName} description={user.firstName + "'s Order"} amount={orderTotal} />
                                            <button
                                                type="submit"
                                                className="btn btn-info"
                                                onClick={this.handleSubmit}
                                            >
                                                Submit Order
									</button>
                                        </div>
                                    )}
                            </div>
                            <div>
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
    }
}

export default connect(mapState, mapDispatch)(Checkout)
