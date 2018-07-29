import React, { Component } from 'react'
import Reviews from './reviews'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import CartTable from './cartTable'

class Cart extends Component {
    constructor() {
        super()
    }

    // handleChange = (evt) => {
    //     console.log(evt.target.value)
    // }

    handleSubmit = (evt) => {
        evt.preventDefault()
        // await this.props.placeOrder(this.state);
        this.props.history.push(`/checkout`)
    }

    handleEdit = evt => {
        console.log('TARGET', this.props, 'EVENT', evt)
        console.log('EVT', evt.target.value)
        console.log("PRODUCT", this)
        const { product } = this.props
        const productToAdd = {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: Number(this.state.quantity),
            subtotal: this.state.quantity * product.price,
            // image: product.photos[0]
        }
        this.props.addToCart(productToAdd)

    }

    handleEdit = evt => {
        console.log('TARGET', this.props, 'EVENT', evt)
        console.log('EVT', evt.target.value)
    }

    handleClear = evt => {
        console.log(evt.target)
    }

    render() {
        const { products } = this.props

        return (
            <div className="cart">
                <h2>Cart</h2>
                {products.length === 0 ? (
                    <div>
                        <p>
                            <span>There are currently no items in your cart</span>
                        </p>
                        <Link to="/products">
                            <button type="submit" className="btn btn-primary">
                                Keep Shopping
							</button>
                        </Link>
                    </div>
                ) : (
                        <CartTable
                            products={products}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            handleEdit={this.handleEdit}
                            handleClear={this.handleClear}
                        />
                    )}
            </div>
        )
    }
}

const mapState = state => {
    return {
        products: state.order.products,
        orderTotal: state.order.orderTotal
    }
}

export default connect(mapState, null)(Cart)
