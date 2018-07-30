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

// GET /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
	try {
		const orders = await Order.findById(req.params.orderId, {
			include: [{ all: true }]
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})
