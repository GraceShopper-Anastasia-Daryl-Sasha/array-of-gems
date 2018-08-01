import React from 'react'
// https://stackoverflow.com/questions/45360519/filter-multiple-values-in-react
class SearchBar extends React.Component {
	constructor() {
		super()
		this.state = { term: '' }
	}

	onInputChange(term) {
		this.setState({ term })
		// this.props.onTermChange(term);
	}

	handleSubmit = evt => {
		evt.preventDefault()
	}
	render() {
		return (
			<form className="form-inline search" onSubmit={this.handleSubmit}>
				<input
					type="text"
					className="form-control form-control-sm"
					placeholder="Search"
					onChange={event => this.onInputChange(event.target.value)}
				/>
				<button type="submit" className="btn btn-primary btn-sm search-btn">
					Search
				</button>
			</form>
		)
	}
}

export default SearchBar
