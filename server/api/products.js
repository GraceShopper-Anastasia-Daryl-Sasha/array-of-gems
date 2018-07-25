const router = require('express').Router()
const { Product, Review } = require('../db/models')

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
    const singleProduct = await Product.findById(req.params.productId, { include: [{ model: Review }] })
    if (!singleProduct) {
      res.sendStatus(404)
    }
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router
