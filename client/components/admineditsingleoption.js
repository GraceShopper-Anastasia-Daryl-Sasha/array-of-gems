import React from 'react'

const AdminEditSingleOption = props => {
	const { value } = props

	return (
		<div>
			<input
				type="number"
				className="form-control"
				defaultValue={value}
				name="price"
				value={props.value}
			/>
			<button type="button" className="btn btn-info">
				Update
			</button>
		</div>
	)
}
