const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')

// - Orders must belong to a user OR guest session (authenticated vs unauthenticated)

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Order.belongsToMany(Product, { through: 'OrderProducts' })
Product.belongsToMany(Order, { through: 'OrderProducts' })

User.hasMany(Order)

module.exports = {
	Order,
	Product,
	Review,
	User
}
