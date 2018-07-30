import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../store/action-creators'
import AdminSidebar from './adminSidebar'

class AdminManageProducts extends Component {
	componentDidMount() {
		this.props.fetchProducts()
	}
	render() {
		const { products } = this.props
		console.log('Products', products)
		return (
			<div id="admin">
				<div className="row">
					<AdminSidebar />
					<div className="admin-view">
						<h3>Manage Products</h3>
						<div className="top-view">
							<Link to="/new-product">
								<button type="submit" className="btn btn-primary">
									Add new product
								</button>
							</Link>
						</div>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th scope="col">Id</th>
									<th scope="col">Image</th>
									<th scope="col">Product Title</th>
									<th scope="col">Stock</th>
									<th scope="col">Price</th>
								</tr>
							</thead>
							<tbody>
								{products.map(product => (
									<tr key={product.id}>
										<th scope="row">{product.id}</th>
										<td>
											<img src={product.photos[0].image} />
										</td>

										<td>
											<Link to={'/admin-single-product/' + product.id}>
												{product.title}
											</Link>
										</td>

										<td>{product.stock}</td>
										<td>${product.price}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => {
	return {
		products: state.products
	}
}

const mapDispatch = dispatch => {
	return {
		fetchProducts: () => dispatch(fetchProducts())
	}
}

export default connect(mapState, mapDispatch)(AdminManageProducts)
