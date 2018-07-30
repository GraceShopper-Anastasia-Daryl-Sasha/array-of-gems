import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import OrderSummary from "./orderSummary";


class Checkout extends Component {
    constructor() {
        super()
    }

    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     console.log("TARGET", this.state)
    //     // await this.props.placeOrder(this.state);
    //     this.props.history.push(`/checkout`)
    // }

    render() {
        const { products, orderTotal } = JSON.parse(localStorage.getItem('cart'))
        console.log("PROPS", this.props)

        return (
            <div>
                {products.length === 0
                    ? (<Redirect to="/cart" />)
                    : (
                        <div>
                            <div>
                                {
                                    !this.props.user && (
                                        <form>
                                            <label>Please provide email or <Link to='/login'>Login</Link>: </label>
                                            <input />
                                            <button>Submit</button>
                                        </form>
                                    )

                                }
                                <form>
                                    <label>Please provide email or <Link to='/login'>Login</Link>: </label>
                                    <input />
                                    <button>Submit</button>
                                </form>
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
                <button>Checkout?</button>
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

const mapState = state => {
    return {
        user: state.user
    }
}


export default connect(mapState)(Checkout)
