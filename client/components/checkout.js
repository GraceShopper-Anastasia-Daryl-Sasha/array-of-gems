import React, { Component } from 'react';
import Reviews from './reviews'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { getCart } from "../store/action-creators.js"
import CartTable from "./cartTable"


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
        const { products } = this.props
        console.log(products)

        return (
            <div>
                <h2>Checkout</h2>
            </div>
        )

    }
}

const mapState = (state) => {
    console.log(state)
    return {
        products: state.order.products
    }
};

export default connect(mapState, null)(Checkout)
