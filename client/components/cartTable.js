import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const CartTable = (props) => {
    const { products } = props
    let orderTotal = 0;
    products.map(product => {
        orderTotal = orderTotal + Number(product.subtotal)
    })

    return (

        <div>
            <h3>THIS IS YOUR CART: </h3>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        {/* <th scope="col">Image</th> */}
                        <th scope="col">Product Title</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Subtotal</th>
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
                            <td>${product.price}</td>
                            <td>${product.subtotal}</td>
                        </tr>
                    ))
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Total: </td>
                        <td>${orderTotal}</td>
                    </tr>
                </tbody>

            </table>
            <form onSubmit={props.handleSubmit}>
                <button type="submit" onSubmit={props.handleSubmit}>Checkout</button>
                <button><Link to="/products">Keep Shopping</Link></button>
            </form>
        </div>
    )
}

export default CartTable