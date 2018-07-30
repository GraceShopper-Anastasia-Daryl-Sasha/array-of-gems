import React from 'react'

const ProductForm = props => {
	const { handleSubmit, product } = props
	console.log()
	let isCreate = true
	if (product.title !== '') {
		isCreate = false
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-row">
				<div className="form-group col-sm-12">
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
			</div>
			<div className="form-row">
				<div className="form-group col-sm-12">
					<label htmlFor="description">Description: </label>
					<textarea
						className="form-control"
						name="description"
						defaultValue={product.description}
						value={props.description}
						rows="3"
					/>
				</div>
			</div>
			<div className="form-row">
				{!product.photos && (
					<div className="form-group col-sm-12">
						<label htmlFor="title">Images: </label>
						<input
							type="text"
							className="form-control"
							name="image1"
							value={props.image1}
						/>
						<input
							type="text"
							className="form-control"
							name="image2"
							value={props.image2}
						/>
						<input
							type="text"
							className="form-control"
							name="image3"
							value={props.image3}
						/>
					</div>
				)}
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
					<label htmlFor="title">Stock: </label>
					<input
						type="number"
						className="form-control"
						defaultValue={product.stock}
						name="stock"
						value={props.stock}
						required
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-group col-sm-4">
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
