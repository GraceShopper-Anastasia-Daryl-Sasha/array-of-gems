const router = require('express').Router()
const { Product, Review, Photo, Order, OrderProducts } = require('../db/models')

// GET /api/orders  
// receive all orders 
router.get('/', async (req, res, next) => {
    try {
        const orders = await Product.findAll({ include: [{ all: true }] })
        res.json(orders)
    } catch (err) {
        next(err)
    }
})

// GET /api/orders/:userId
// receive all orders 
router.get('/:userEmail', async (req, res, next) => {
    try {

        const user = await User.findOne({ where: { email: userEmail } })
        // const allUserOrders = await Product.findAll({ include: [{ all: true }] })
        res.json(user)
    } catch (err) {
        next(err)
    }
})

// create new order
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

// PUT /api/orders/:id
// update order information 

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

router.delete('/:id', async (req, res, next) => {
    await Product.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)
    res.status(204).end()
})

module.exports = router