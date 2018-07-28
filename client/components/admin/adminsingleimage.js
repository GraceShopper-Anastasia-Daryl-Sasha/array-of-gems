import React from 'react'

const AdminSingleImage = props => {
	const { photo, handleSubmit } = props

	return (
		<li>
			<div className="card">
				<img className="card-img-top" src={photo.image} />
				<div className="card-body">
					<div className="form-group">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								className="form-control"
								name="image"
								value={props.image}
							/>
							<button type="submit" className="btn btn-info">
								Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</li>
	)
}

export default AdminSingleImage
