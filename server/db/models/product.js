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
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [['https://cdn.tutsplus.com/vector/uploads/2014/03/0a_Gems_tutorial_ruby.jpg']]
    },
    size: {
        type: Sequelize.ENUM('Birthstone', 'Raw', 'Polished')
    },
    type: {
        type: Sequelize.ENUM('0.5 mm', '1.0 mm', '1.25 mm', '1 in', '2 in')
    },
    color: {
        type: Sequelize.ENUM('Blue', 'Green', 'Purple', 'Red', 'Yellow', 'Black', 'Pink')
    }

})

module.exports = Product