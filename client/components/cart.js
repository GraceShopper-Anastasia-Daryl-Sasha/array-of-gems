import React, { Component } from 'react';
import Reviews from './reviews'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import CartTable from "./cartTable"


class Cart extends Component {
    constructor() {
        super()

    }

    // handleChange = (evt) => {
    //     console.log(evt.target.value)
    // }

    handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log("TARGET", this.state)
        // await this.props.placeOrder(this.state);
        this.props.history.push(`/checkout`)
    }

    handleEdit = evt => {
        console.log('TARGET', this.props, 'EVENT', evt)
        console.log('EVT', evt.target.value)
    }


    render() {
        const { products } = this.props


        return (
            <div>
                <h2>Hello There!</h2>
                {products.length === 0
                    ? <div><span>There are currently no items in your cart</span><br /> <button><Link to="/products">Keep Shopping</Link></button></div>
                    : <CartTable products={products} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit} />
                }
            </div>
        )

    }
}

const mapState = (state) => {
    return {
        products: state.order.products
    }
};

export default connect(mapState, null)(Cart)
