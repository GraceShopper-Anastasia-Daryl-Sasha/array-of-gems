const router = require('express').Router()
const { User, Review } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and email fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'email']
		})
		res.json(users)
	} catch (err) {
		next(err)
	}
})

// admin should access all info about users
router.get('/admin', async (req, res, next) => {
	try {
		const users = await User.findAll()
		res.json(users)
	} catch (err) {
		next(err)
	}
})

router.get('/admin/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id, {
			include: [{ all: true }]
		})
		if (!user) {
			res.sendStatus(404)
		}
		res.json(user)
	} catch (err) {
		next(err)
	}
})

// PUT /users/admin/id
router.put('/admin/:id', async (req, res, next) => {
	try {
		const [numberOfAffectedRows, affectedRows] = await User.update(req.body, {
			where: {
				id: req.params.id
			},
			returning: true,
			plain: true
		})
		res.status(200).json(affectedRows)
	} catch (err) {
		res.sendStatus(500)
	}
})

// PUT /users/admin/reviews/id
router.delete('/admin/reviews/:id', async (req, res, next) => {
	await Review.destroy({
		where: {
			id: req.params.id
		}
	}).catch(next)
	res.status(204).end()
})
