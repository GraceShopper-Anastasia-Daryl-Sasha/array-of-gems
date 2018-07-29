import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import CartTotal from './cartTotal'

const CartTable = (props) => {
    const { products, orderTotal } = props

    return (
        <div>
            {/* <h3>THIS IS YOUR CART: </h3> */}
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        {/* <th scope="col">Image</th> */}
                        <th scope="col">Product Title</th>
                        <th scope="col">Quantity</th>
                        <th scope="col" />
                        <th scope="col">Price</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            {/* <td>
                                            <img src={product.photos[0]} />
                                        </td> */}

                            <td>
                                <Link to={'/admin-single-product/' + product.id}>
                                    {product.title}
                                </Link>
                            </td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={props.handleEdit}>Edit</button>
                            </td>
                            <td>${product.price}</td>
                            <td>${product.subtotal}</td>
                            <td>
                                <button>Remove</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td>Total: </td>
                        <td>${orderTotal}</td>
                        <td />
                    </tr>
                </tbody>
            </table>
            <form onSubmit={props.handleSubmit}>
                <button type="submit" onSubmit={props.handleSubmit}>
                    Checkout
				</button>
                <button>
                    <Link to="/products">Keep Shopping</Link>
                </button>
                <button onClick={props.handleClear}>Clear Cart</button>
            </form>
            <CartTotal />
        </div>
    )
}

export default CartTable
