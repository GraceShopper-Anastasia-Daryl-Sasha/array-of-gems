const router = require('express').Router()
const { Product, Review, Photo } = require('../db/models')

// GET /api/products
router.get('/', async (req, res, next) => {
	try {
		const allProducts = await Product.findAll({ include: [{ all: true }] })
		res.json(allProducts)
	} catch (err) {
		next(err)
	}
})

// GET /api/products/productId
router.get('/:productId', async (req, res, next) => {
	try {
		const singleProduct = await Product.findById(req.params.productId, {
			include: [{ model: Review }, { model: Photo }]
		})
		if (!singleProduct) {
			res.sendStatus(404)
		}
		res.json(singleProduct)
	} catch (err) {
		next(err)
	}
})

// POST /api/products
router.post('/', async (req, res, next) => {
	try {
		const newProduct = await Product.create(req.body.product)
		const photos = await Promise.all(
			req.body.photos.map(photo =>
				Photo.create({ image: photo, productId: newProduct.id })
			)
		)
		res.status(200).json({ product: newProduct, photos: photos })
	} catch (err) {
		res.sendStatus(500)
	}
})

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
	try {
		const [numberOfAffectedRows, affectedRows] = await Product.update(
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
})

// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
	await Product.destroy({
		where: {
			id: req.params.id
		}
	}).catch(next)
	res.status(204).end()
})

//POST /api/products/:id/reviews
router.post('/:id/reviews', async (req, res, next) => {
	try {
		const newReview = await Review.create(req.body)
		res.status(200).json(newReview)
	} catch (err) {
		res.sendStatus(500)
	}
})

module.exports = router
