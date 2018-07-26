import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCategories } from "../store/action-creators"


class Sidebar extends Component {
	constructor() {
		super()
		this.state = {
			'color': [],
			'type': [],
			'size': []
		}
	}

	handleSubmit = (evt) => {
		console.log(evt.target.name)
		evt.preventDefault();
		const selected = this.state;
		this.props.getCategories(selected)
	}


	handleClick = (evt) => {
		const category = evt.target.name;
		let newCategoryArr = [];
		if (this.state[category].includes(evt.target.value)) {
			let cat = this.state[evt.target.name]
			cat.forEach(currVal => {
				if (currVal !== evt.target.value) {
					newCategoryArr.push(currVal)
				}
			})
			this.setState({
				[evt.target.name]: newCategoryArr
			})
		} else if (this.state[category]) {
			newCategoryArr = [...this.state[evt.target.name], evt.target.value]
			this.setState({
				[evt.target.name]: newCategoryArr
			})
		}
	}

	render() {
		const allProducts = this.props.products;
		let categories = {
			colors: [],
			types: [],
			sizes: []
		}

		allProducts.forEach(product => {
			if (!categories.colors.includes(product.color)) {
				categories.colors.push(product.color)
			}
			if (!categories.types.includes(product.type)) {
				categories.types.push(product.type)
			}
			if (!categories.sizes.includes(product.size)) {
				categories.sizes.push(product.size)
			}
		})

		return (
			<div id="sidebar">
				<h5>Select Options</h5>
				<h6>All Products</h6>
				<form onSubmit={this.handleSubmit}>
					<div className="options">
						<p>Select by Color</p>
						{categories.colors.map(color => (
							<div key={color} className="form-group form-check">
								<input type="checkbox" className="form-check-input" onChange={this.handleClick} name="color" value={color} />
								<label className="form-check-label" htmlFor="colors">
									{color}
								</label>
							</div>
						))}

						<p>Select by Size</p>
						{categories.sizes.map(size => (
							<div key={size} className="form-group form-check">
								<input type="checkbox" className="form-check-input" onChange={this.handleClick} name="size" value={size} />
								<label className="form-check-label" htmlFor="sizes">
									{size}
								</label>
							</div>
						))}
						<p>Select by type</p>
						{categories.types.map(type => (
							<div key={type} className="form-group form-check">
								<input type="checkbox" className="form-check-input" onChange={this.handleClick} name="type" value={type} />
								<label className="form-check-label" htmlFor="type">
									{type}
								</label>
							</div>
						))}
					</div>
					<button className='btn btn-default' name="submit" type="submit">Search</button>
					<button className='btn btn-default' name="clear" type="submit" >Clear</button>
				</form >

			</div >
		)
	}
}

const mapDispatch = dispatch => {
	return {
		getCategories: (categories) => dispatch(getCategories(categories))
	}
}

export default connect(null, mapDispatch)(Sidebar)