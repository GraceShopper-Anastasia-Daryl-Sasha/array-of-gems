const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
    image: {
        type: Sequelize.STRING,
        defaultValue: 'https://cdn.tutsplus.com/vector/uploads/2014/03/0a_Gems_tutorial_ruby.jpg'
    }
})

module.exports = Photo
