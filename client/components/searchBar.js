import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({ term });
        // this.props.onTermChange(term);
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(this.state.term)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={event => this.onInputChange(event.target.value)} />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchBar;