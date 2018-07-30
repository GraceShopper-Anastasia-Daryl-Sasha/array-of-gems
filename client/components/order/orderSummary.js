import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const OrderSummary = (props) => {
    const { products, orderTotal } = props
    console.log('PRODUCTS', products)
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
            <form >
                {/* coupons within stripe only allow for recurring subscriptions, will need to handle otherwise */}
                <label >Discount Code</label>
                <input />
                <button>Apply</button>
            </form>
        </div>
    )
}

export default OrderSummary
