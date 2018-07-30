const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('OrderProducts', {
	productPrice: {
		type: Sequelize.DOUBLE
	},
	regularPrice: {
		type: Sequelize.DOUBLE
	},
	productQuantity: {
		type: Sequelize.INTEGER
	},
	isdiscounted: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
})

OrderProducts.prototype.productTotal = () => {
	return this.productPrice * this.productQuantity
}

module.exports = OrderProducts
