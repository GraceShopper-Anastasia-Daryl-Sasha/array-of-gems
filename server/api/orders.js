const router = require('express').Router()
const { Order, OrderProducts, User } = require('../db/models')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
	try {
		const allOrders = await Order.findAll({ include: [{ all: true }] })
		res.json(allOrders)
	} catch (err) {
		next(err)
	}
})
