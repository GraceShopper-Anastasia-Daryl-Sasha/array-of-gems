const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			min: 0.01
		}
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	type: {
		type: Sequelize.ENUM,
		values: ['Birthstone', 'Raw', 'Polished']
	},
	size: {
		type: Sequelize.ENUM,
		values: ['0.5 mm', '1.0 mm', '1.25 mm', '1 in', '2 in']
	},
	color: {
		type: Sequelize.ENUM,
		values: [
			'Blue',
			'Green',
			'Purple',
			'Red',
			'Yellow',
			'Black',
			'Pink',
			'White',
			'Brown'
		]
	}
})

module.exports = Product
