import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import CartSummary from "./cartSummary"


class Checkout extends Component {
    constructor() {
        super()

    }

    // handleChange = (evt) => {
    //     console.log(evt.target.value)
    // }

    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     console.log("TARGET", this.state)
    //     // await this.props.placeOrder(this.state);
    //     this.props.history.push(`/checkout`)

    // }


    render() {
        const { products, orderTotal } = this.props

        return (
            <div>
                {products.length === 0 ? (
                    <Redirect to="/cart" />
                ) : (
                        <div>
                            <span>Checkout</span>
                            <CartSummary
                                products={products}
                                orderTotal={orderTotal}
                            />
                        </div>
                    )
                }
            </div>
        )

    }
}

const mapState = (state) => {
    console.log(state)
    return {
        products: state.order.products,
        orderTotal: state.order.orderTotal
    }
};

export default connect(mapState, null)(Checkout)
