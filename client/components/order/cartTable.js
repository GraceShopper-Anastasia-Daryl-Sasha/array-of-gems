import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const CartTable = props => {
	const { products, orderTotal } = props
	console.log('PRODUCTS', props)
	return (
		<div className="my-account">
			<h3>Items in your cart</h3>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">Image</th>
						<th scope="col">Product Title</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
						<th scope="col">Subtotal</th>
						<th scope="col" />
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product.productId}>
							<td>
								<img src={product.image} />
							</td>

							<td>
								<Link to={`/products/${product.productId}`}>
									{product.title}
								</Link>
							</td>
							<td className="item-quantity-wrapper">{product.quantity}</td>

							{/* <form>
									<button className="cart-item-controls decrement" onClick={props.handleEdit}> - </button>
									<input className="item-quantity" name="qty[]" pattern="[0-9]*" value={product.quantity} min="0" onClick={props.handleChange} />
									<button className="cart-item-controls increment" onClick={props.handleEdit}> + </button>
							</form>
					</td> */}
							<td>${product.price}</td>
							<td>${product.subtotal}</td>
							<td>
								<button
									type="button"
									className="btn btn-danger"
									onClick={props.handleRemove(product.id)}
								>
									X
								</button>
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
			<form className="cart-table" onSubmit={props.handleSubmit}>
				<button type="submit" className="btn btn-primary">
					Checkout
				</button>
				<Link to="/products">
					<button type="button" className="btn btn-info">
						Keep Shopping
					</button>
				</Link>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={props.handleClear}
				>
					Clear Cart
				</button>
			</form>
		</div>
	)
}

export default CartTable
