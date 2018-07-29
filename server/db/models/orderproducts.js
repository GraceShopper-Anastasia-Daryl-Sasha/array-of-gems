const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('OrderProducts', {
    productPrice: {
        type: Sequelize.DOUBLE
    },
    productQuantity: {
        type: Sequelize.INTEGER
    }
})

OrderProducts.prototype.productTotal = () => {
    return productPrice * productQuantity
};

module.exports = OrderProducts;
