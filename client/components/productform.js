import React from 'react'

const ProductForm = props => {
	const { handleSubmit, product } = props
	let isCreate = true
	if (product.title !== '') {
		isCreate = false
	}

	return (
		<form onSubmit={handleSubmit} className="form">
			<div className="form-group">
				<label htmlFor="title">Product title: </label>
				<input
					type="text"
					className="form-control"
					defaultValue={product.title}
					name="title"
					value={props.title}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description: </label>
				<textarea
					className="form-control"
					name="description"
					defaultValue={product.description}
					value={props.description}
					rows="3"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="title">Images: </label>
				<textarea
					className="form-control"
					defaultValue={product.photos[0]}
					name="photos"
					value={props.photos}
					rows="3"
				/>
			</div>

			<div className="form-row">
				<div className="form-group col-sm-5">
					<label htmlFor="title">Price: </label>
					<input
						type="number"
						className="form-control"
						defaultValue={product.price}
						name="price"
						value={props.price}
						required
					/>
				</div>

				<div className="form-group col-sm-5">
					<label htmlFor="title">Quantity: </label>
					<input
						type="number"
						className="form-control"
						defaultValue={product.quantity}
						name="quantity"
						value={props.quantity}
						required
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-group col-sm-3">
					<label htmlFor="title">Type: </label>
					<input
						type="text"
						className="form-control"
						defaultValue={product.type}
						name="type"
						value={props.type}
						required
					/>
				</div>

				<div className="form-group col-sm-3">
					<label htmlFor="title">Size: </label>
					<input
						type="text"
						className="form-control"
						defaultValue={product.size}
						name="size"
						value={props.size}
						required
					/>
				</div>

				<div className="form-group col-sm-3">
					<label htmlFor="title">Color: </label>
					<input
						type="text"
						className="form-control"
						defaultValue={product.color}
						name="color"
						value={props.color}
						required
					/>
				</div>
			</div>

			<div className="form-button">
				{!isCreate ? (
					<button type="submit" className="btn btn-primary">
						Update Product
					</button>
				) : (
					<button type="submit" className="btn btn-primary">
						Create Product
					</button>
				)}
			</div>
		</form>
	)
}

export default ProductForm