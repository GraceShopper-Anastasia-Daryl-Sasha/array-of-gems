const router = require('express').Router()
router.use(require("body-parser").text());
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");

module.exports = router

router.post("/charge", async (req, res) => {
    try {
        let { status } = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body
        });

        res.json({ status });
    } catch (err) {
        res.status(500).end();
    }
});