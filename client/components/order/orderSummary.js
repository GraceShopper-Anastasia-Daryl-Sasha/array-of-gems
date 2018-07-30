import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { applyDiscount } from "../../store/action-creators"

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        // this.input = React.createRef();
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const code = this._input.value
        if (code === "Boone") {
            this.props.applyDiscount(code);
        } else {
            console.log("That code is not valid")
        }
        // this.input
    }

    render() {
        const { products, orderTotal } = this.props

        return (
            <div>
                <h3>ITEMS IN CART </h3>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Product Title</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="tr">
                                <td><img src={product.image} /></td>
                                <td>{product.quantity} x {product.title}</td>
                                <td>${product.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span>Total:</span>
                <span>${orderTotal}</span>
                <form onSubmit={this.handleSubmit} >
                    {/* coupons within stripe only allow for recurring subscriptions, will need to handle otherwise */}
                    <label>
                        Discount Code
                        <input type="text" ref={(input) => this._input = input} />
                    </label>
                    <input type="submit" value="Apply" />
                </form>
            </div>
        )
    }

}

const mapDispatch = (dispatch) => {
    return {
        applyDiscount: code => dispatch(applyDiscount(code))
    }
}

export default connect(null, mapDispatch)(OrderSummary)
