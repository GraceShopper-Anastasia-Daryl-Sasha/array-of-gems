import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import OrderSummary from "./orderSummary"


class Checkout extends Component {
    constructor() {
        super()

    }

    // applyCode = (evt) => {
    //     evt.preventDefault(),
    //         console.log("TARGET", evt.target.value)
    //         console.log("sta")
    // }
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
        const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))

        return (
            <div>
                {products.length === 0 ? (
                    <Redirect to="/cart" />
                ) : (
                        <div>
                            <div>

                            </div>
                            <div>
                                <OrderSummary
                                    products={products}
                                    orderTotal={orderTotal}
                                    applyCode={this.applyCode}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        )

    }
}

// const mapState = (state) => {
//     console.log(state)
//     return {
//         products: state.order.products,
//         orderTotal: state.order.orderTotal
//     }
// };

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            // const order = 
        }
    }
}

export default connect(null, null)(Checkout)
