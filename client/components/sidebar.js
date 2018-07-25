import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const sizes = ['0.5 mm', '1.0 mm', '1.25 mm', '1 in', '2 in']
const types = ['Birthstone', 'Raw', 'Polished']
const colors = [
	'Blue',
	'Green',
	'Purple',
	'Red',
	'Yellow',
	'Black',
	'Pink',
	'White',
	'Brown'
]

// Get all products from state and filter their properties to render checkboxes

export default class Sidebar extends Component {
	render() {
		return (
			<div id="sidebar">
				<h5>Select Options</h5>
				{/* <Link to="/">All Products</Link> */}
				<div className="options">
					<p>Select by Color</p>
					{colors.map(color => (
						<div key={color} className="form-group form-check">
							<input type="checkbox" className="form-check-input" />
							<label className="form-check-label" htmlFor="colors">
								{color}
							</label>
						</div>
					))}

					<p>Select by Size</p>
					{sizes.map(size => (
						<div key={size} className="form-group form-check">
							<input type="checkbox" className="form-check-input" />
							<label className="form-check-label" htmlFor="sizes">
								{size}
							</label>
						</div>
					))}
					<p>Select by type</p>
					{types.map(type => (
						<div key={type} className="form-group form-check">
							<input type="checkbox" className="form-check-input" />
							<label className="form-check-label" htmlFor="type">
								{type}
							</label>
						</div>
					))}
				</div>
			</div>
		)
	}
}
