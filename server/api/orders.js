const router = require('express').Router()
const { Order, OrderProducts, User } = require('../db/models')

// GET /api/orders
// receive all orders
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

// create new order
// POST /api/orders
router.post('/', async (req, res, next) => {
	try {
		const email = req.body.userEmail
		let userAccount = await User.findOne({ where: { email } })
		if (!userAccount) {
			userAccount = await User.create({ email })
		}

		const newO = await Order.create({
			orderTotal: req.body.order.orderTotal,
			quantity: req.body.order.quantity,
			userId: userAccount.id
		})

		const lineItems = await Promise.all(
			req.body.cart.map(product =>
				OrderProducts.create({
					productPrice: product.price,
					discountedPrice: product.discountedPrice,
					productQuantity: product.quantity,
					productId: product.productId,
					orderId: newO.id,
					isDiscounted: product.isDiscounted,
					regularPrice: product.regularPrice
				})
			)
		)
		res
			.status(200)
			.json({ order: newO, lineItems: lineItems, userAccount: userAccount })
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
})

// PUT /api/orders/:id
router.put('/:id', async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		console.log('Admin')
		try {
			const [numberOfAffectedRows, affectedRows] = await Order.update(
				req.body,
				{
					where: {
						id: req.params.id
					},
					returning: true,
					plain: true
				}
			)
			res.status(200).json(affectedRows)
		} catch (err) {
			res.sendStatus(500)
		}
	} else {
		console.log("You're not authorized...")
	}
})

module.exports = router
