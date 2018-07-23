const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    body: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 30]
        }
    },
    rating: {
        type: Sequelize.Integer,
        validate: {
            min: 0,
            max: 5
        }
    },
    comment: {
        type: Sequelize.TEXT,
        validate: {
            len: [10, 200]
        }
    }
})

module.exports = Review
