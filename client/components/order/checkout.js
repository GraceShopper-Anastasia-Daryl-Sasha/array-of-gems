import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import OrderSummary from "./orderSummary";
import { postOrder, clearCart } from "../../store/action-creators"
import CheckoutForm from './checkoutForm'
import { Elements, StripeProvider } from 'react-stripe-elements';


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
            <div>
                {products.length === 0
                    ? (<Redirect to="/cart" />)
                    : (
                        <div>
                            <div>
                                {
                                    !user.id
                                        ?
                                        < form >
                                            <label>Please <Link to='/login'>Login</Link> or continue as guest: </label>
                                            <input />
                                            <button>Submit</button>
                                        </form>
                                        :
                                        <div>
                                            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                                                <div className="paymentInfo">
                                                    <h3>Enter Payment Information</h3>
                                                    <Elements>
                                                        <CheckoutForm />
                                                    </Elements>
                                                </div>
                                            </StripeProvider>
                                            <form onSubmit={this.handleSubmit}>
                                                <div>
                                                    <label>Welcome {user.firstName} {user.lastName}</label>
                                                    <button type="submit" >Submit Order</button>
                                                </div>
                                            </form>
                                        </div>

                                }

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
                    )
                }

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
