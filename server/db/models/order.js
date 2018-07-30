const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {

    orderTotal: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.00
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM('Created', 'Pending', 'Shipped', 'Delivered'),
        defaultValue: 'Pending'
    },
    datePlaced: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    shippingPrice: {
        type: Sequelize.DOUBLE,
        default: 2.99
    },
    discountCode: {
        type: Sequelize.STRING
    }

})

// ...purchase items in the cart, so that I can get the items I want
// ...specify a shipping address and email address when I checkout, so that the items can arrive at the right place
// ...receive a confirmation email after I checkout, so that I know my order is being looked at
// ...receive a notification email when the order ships, and then when the order is delivered, so that I can stay up to date on when my order will arrive
// - Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// - Orders must contain line items that capture the price, current product ID and quantity
// - If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes


// methods


module.exports = Order