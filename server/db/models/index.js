const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');

// - Orders must belong to a user OR guest session (authenticated vs unauthenticated)


Review.belongsTo(Product, { foreignKey: 'ReviewProductId' })
Product.hasMany(Review, { foreignKey: 'ReviewProductId' })

Review.belongsTo(User, { foreignKey: 'ReviewUserId' })
User.hasMany(Review, { foreignKey: 'ReviewUserId' })

Order.belongsToMany(Product, { through: 'OrderProducts' })
Product.belongsToMany(Order, { through: 'OrderProducts' })


User.hasMany(Order)


module.exports = {
  Category,
  Order,
  Product,
  Review,
  Tag,
  User
}
