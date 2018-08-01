import React, { Component } from 'react'

const images = [
	'https://cdn.shopify.com/s/files/1/0885/3178/t/9/assets/1626x600_tradition_gemstones.jpg?13357309008435823644',
	'https://www.energymuse.com/blog/wp-content/uploads/2015/09/purplegemstones-1050x700.jpg',
	'http://lifematspro.com/wp-content/uploads/2016/04/Amethyst-Crystal-Healing_image1.jpg',
	'https://cdn7.bigcommerce.com/s-91397/images/stencil/original/products/1422/3021/Fluorite_gemstones_white_magick_alchemy_1__68418.1362590063.jpg?c=2&imbypass=on',
	'https://www.sagegoddess.com/wp-content/uploads/2017/03/Broken-Gemstones-Sage-Goddess-Blog-FB-Share-1024x538.jpg.optimal.jpg'
]

class Carousel extends Component {
	constructor() {
		super()
		this.state = {
			img: images,
			idx: 0
		}
	}

	componentDidMount() {
		setInterval(() => {
			// console.log('this.state.idx', this.state.idx)
			if (this.state.idx === this.state.img.length - 1) {
				this.setState({ idx: 0 })
			} else {
				this.setState({ idx: this.state.idx + 1 })
			}
		}, 3500)
	}
	render() {
		return (
			<div className="my-carousel">
				{this.state.idx === 0 && (
					<img className="visible" src={this.state.img[this.state.idx]} />
				)}
				{this.state.idx === 1 && (
					<img className="visible" src={this.state.img[this.state.idx]} />
				)}
				{this.state.idx === 2 && (
					<img className="visible" src={this.state.img[this.state.idx]} />
				)}
				{this.state.idx === 3 && (
					<img className="visible" src={this.state.img[this.state.idx]} />
				)}
				{this.state.idx === 4 && (
					<img className="visible" src={this.state.img[this.state.idx]} />
				)}
			</div>
		)
	}
}

export default Carousel
