const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('product', {
    color: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    size: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    type: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
}