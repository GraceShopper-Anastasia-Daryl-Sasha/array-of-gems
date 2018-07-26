const Order = require('./order')
const Photo = require('./photo')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
// - Orders must belong to a user OR guest session (authenticated vs unauthenticated)

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Photo.belongsTo(Product)
Product.hasMany(Photo)

Order.belongsToMany(Product, { through: 'OrderProducts' })
Product.belongsToMany(Order, { through: 'OrderProducts' })

User.hasMany(Order)

module.exports = {
	Order,
	Photo,
	Product,
	Review,
	User
}
