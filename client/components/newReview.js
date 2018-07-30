import React, { Component } from 'react'


class NewReview extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      rating: 0,
      comment: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  // clearField(evt) {
  //   evt.preventDefault()
  //   this.props.handleSubmit(evt)
  //   this.setState({
  //     title: '',
  //     rating: 0,
  //     comment: ''
  //   })
  // }

  render () {

  return (
    <div className="form-group">
    <form className="form" onSubmit={
      this.props.handleSubmit} onChange ={this.handleInputChange}>
    <h3>Leave a Review</h3>
    <label>Title:</label>
      <input
        type="text"
        className="form-control"
        name="title"
        value={this.state.title}
      />
      <label>Rating:</label>
      <select name="rating" value={this.state.rating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <label>Comment:</label>
    <textarea
        className="form-control"
        name="comment"
        value={this.state.comment}
        rows="3"
      />
      {
        this.state.comment.length < 10 && this.state.comment.length > 0 ? <div>
          The comments must be longer than 10 characters.
        </div> : null
      }
      <button type="submit" className="btn btn-info" >
        Add Review
      </button>
        </form>
      </div>
    )
  }
}


export default NewReview
