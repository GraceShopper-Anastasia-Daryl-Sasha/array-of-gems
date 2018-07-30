const router = require('express').Router()
const { Product, Review, Photo, Order, OrderProducts, User } = require('../db/models')

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

// // GET /api/orders/:userEmail
// // receive all orders for specific user
// router.get('/:userEmail', async (req, res, next) => {
//     try {
//         // will need to update since we don't 
//         const email = req.params.userEmail
//         const orders = await Order.findAll({
//             include: [{
//                 model: User,
//                 where: { email }
//             }]
//         })
//         res.json(orders)
//     } catch (err) {
//         next(err)
//     }
// })

// create new order
// POST /api/orders
router.post('/', async (req, res, next) => {
    try {
        // let userInfo = {};
        const email = req.body.userEmail
        let userAccount = await User.findOne({ where: { email } })
        if (!userAccount) {
            userAccount = await User.create({ email })
        }
        const newOrder = await Order.create({
            "orderTotal": req.body.order.orderTotal,
            "quantity": req.body.order.quantity,
            "status": req.body.order.status,
            "userId": userAccount.id,
            "shippingPrice": req.body.shippingPrice
        })

        const lineItems = await Promise.all(
            req.body.cart.map(product =>
                OrderProducts.create({
                    "productPrice": product.price,
                    "discountedPrice": product.discountedPrice,
                    "productQuantity": product.quantity,
                    "productId": product.productId,
                    "orderId": newOrder.id,
                    "isDiscounted": product.isDiscounted,
                    "regularPrice": product.regularPrice
                })
            )
        )

        // lineItems: lineItems, user: newGuestUser, user: userInfo, user: userAccount || newUserAccount   }
        res.status(200).json({ order: newOrder, lineItems: lineItems })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

// PUT /api/orders/:id
// update order information 

// router.put('/:id', async (req, res, next) => {
//     try {

//         res.status(200).json()
//     } catch (err) {
//         res.sendStatus(500)
//     }
// })

module.exports = router