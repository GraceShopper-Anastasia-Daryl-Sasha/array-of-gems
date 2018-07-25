import React, { Component } from 'react';
import Sidebar from './sidebar'

export default class AllProducts extends Component {
  render() {
    const products = this.props.allProducts
    return (
      //put onclick listener on each product, which is a react link to the singleProduct container, the container will have a selectedProduct dispatch action to the store to update the selected product to the one clicked, then singleProduct presentational component will render the selected product, onclick listener with event handler that will dispatch the action instead
      <div className="main-container">
        <Sidebar />
        <div>
          <ul>
            {
              products.map(product => (
                <li key={product.id}>{product.title}</li>
              ))
            }

          </ul>
        </div>
      </div>
    )
  }
}
