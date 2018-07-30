const router = require('express').Router()
const { Photo } = require('../db/models')
module.exports = router
// PUT /api/photos/:id
router.put('/:id', async (req, res, next) => {
	try {
		const [numberOfAffectedRows, affectedRows] = await Photo.update(req.body, {
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
