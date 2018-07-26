import React from 'react'
import { Link } from 'react-router-dom'

const SingleProductCard = (props) => {
    const { product } = props
    return (
        <div className="product">
            <div className="product-image">
                <img src={product.photos[0]} />
            </div>
            <div className="product-info">
                <a>{product.title}</a> <br />
                <a>Price: ${product.price}</a>
            </div>
            <div className='product-buttons'>
                <button>Add to Cart</button>
                <button><Link to={`/products/${product.id}`}>More Info</Link></button>
            </div>
        </div>
    )
}

export default SingleProductCard;

