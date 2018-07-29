'use strict'

const db = require('../server/db')
const {
	User,
	Review,
	Product,
	Photo,
	Order,
	OrderProducts
} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const reviews = [
	{
		title: 'SO BEAUTIFUL',
		rating: 5,
		comment:
			'This gemstone is SO beautiful.  It was a little bigger than expected, but worked out perfectly for my project.'
	},
	{
		title: 'Unacceptable Service',
		rating: 1,
		comment:
			'I received this gemstone last week and it was completely scratched. I tried to order a new one and the customer service was horrible.'
	},
	{
		title: 'Perfect!',
		rating: 3,
		comment: 'This gemstone is SO Perfect. I received this last week.',
		userId: 2,
		productId: 9
	},
	{
		title: 'Awesome Service',
		rating: 4,
		comment:
			'I ordered the wrong stone and the team was so helpful in helping me correct my order.'
	},
	{
		title: 'Nice Enough',
		rating: 2,
		comment: 'Average quality, average service.'
	},
	{
		title: 'Perfect alternative to Expensive birthstones',
		rating: 5,
		comment:
			'These are identical to size and cut. The colors are very vibrant. Great value at $7.99 for 12 vs. $5 each at Origami Owl. Highly recommend!',
		userId: 2,
		productId: 13
	},
	{
		title: 'Great!',
		rating: 3,
		comment: 'The gem is cut very well, with smooth edges. '
	},
	{
		title: 'Better than expected!',
		rating: 5,
		comment:
			'I just received my order on time and the beads are gorgeous! I will definitely order again.',
		userId: 1,
		productId: 3
	},
	{
		title: 'pretty rock',
		rating: 4,
		comment:
			"bought this for a friend as a pet rock, it's pretty and I think they'll raise it up to be a well behaved pet"
	},
	{
		title: 'skool of rock!',
		rating: 5,
		comment: "These stones are rockin'!  Awesome quality and service!"
	},
	{
		title: 'Nice quality but the color is not at all what I expected.',
		rating: 3,
		comment:
			'Nice quality but the color is not at all what is depicted in the photo. The beads I received were mostly dark olive green with some brown color (no reds or blues). That said, the package was delivered very quickly.'
	},
	{
		title: 'Wowee Wow Wow',
		rating: 5,
		comment:
			'Exceeds expectations. I purchased this to upgrade my engagement ring and boy is it an upgrade! (I overshot the size a bit, but it was a happy mistake)',
		userId: 2,
		productId: 3
	},
	{
		title: 'Blarg!',
		rating: 0,
		comment:
			'The only positive thing I can say is that the parcel was accurately weighed. Over 95% of the stones were broken, visibly flawed, or improperly cut. There were literally none I could use for jewelry. Sending this back asap!'
	}
]

const products = [
	{
		title: 'Polished Fire Garnet',
		description:
			'This beautiful stone, which is most commonly red but can be found in a range of other colors, symbolizes peace, prosperity and good health.',
		price: 6.95,
		stock: 25,
		quantity: 25,
		color: 'Green',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Amethyst Cluster',
		description:
			'Amethyst is a well known mineral and gemstone. It is the purple variety of the mineral Quartz, and its most valuable and prized variety. Its name derives from the Greek "amethystos", which means "not drunken", as Amethyst in antiquity was thought to ward off drunkenness.',
		price: 5.55,
		stock: 72,
		color: 'Purple',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Raw Aquamarine',
		description:
			'Aquamarine is the greenish-blue to blue variety of Beryl. Unlike Emerald which usually is flawed or heavily included, Aquamarine can form in stunning flawless crystals, creating some of the most beautiful mineral masterpieces.',
		price: 14.5,
		stock: 15,
		color: 'Blue',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Uncut Raw Diamond',
		description:
			'The Precious Gemstone Diamond. Renowned for being the hardest substance on earth, its sparkling fire, durability, and rarity make Diamond the most prized of all gems. No gemstone contains as much allure and interest as does Diamond',
		price: 270.75,
		stock: 7,
		color: 'White',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Raw Emerald Crystal',
		description:
			'Emerald is the most precious stone in the beryl group. The name comes from the old French word "esmeralde", which was derived from the Greek word "smaragdos" meaning "green stone".',
		price: 18.75,
		stock: 21,
		color: 'Green',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Raw Ruby Crystal',
		description:
			'Ruby is a pink to blood-red colored gemstone, a variety of the mineral corundum. Other varieties of gem-quality corundum are called sapphires.',
		price: 15.72,
		stock: 27,
		color: 'Red',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Small Peridot Stones',
		description:
			'Peridot is one of the few gemstones that occur in only one color: an olive-green. The intensity and tint of the green, however, depends on the percentage of iron that is contained in the crystal structure, so the color of individual peridot gems can vary from yellow, to olive, to brownish-green.',
		price: 4.2,
		stock: 39,
		color: 'Green',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Blue Faceted Sapphire',
		description:
			'The sapphire is the birthstone for the month of September. The name sapphire is derived from the Latin word ““saphirus” and the Greek word “sapheiros,” both meaning blue. Some believe that the name sapphire is derived from its association with the planet Saturn. The name can be roughly be translated to mean “dear to the planet Saturn” in many different languages.',
		price: 3.75,
		stock: 52,
		color: 'Blue',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Stunning Black Opal',
		description:
			'The beautiful opal is formed from rain. There is some conjecture on how exactly this precious gemstone forms, but many believe it is formed when water from rain seeps down into crevasses in the rock. Once the water evaporates, the silica that is left behind dries out and hardens into precious opal.',
		price: 9.25,
		stock: 38,
		color: 'Black',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Yellow Topaz',
		description:
			'Most unadulterated topaz is colorless or pale blue. The most rare and valuable topaz is yellow, or pink to reddish-orange, and is known as "imperial topaz" or "precious topaz". Some yellowish-brown topaz gems can gradually fade when continually exposed to daylight.',
		price: 17.5,
		stock: 64,
		color: 'Yellow',
		size: '1.0 mm',
		type: 'Birthstone'
	},
	{
		title: 'Polished Black Onyx',
		description:
			'A Black Onyx stone provides powerful protective energy that help to shield the mind and body from negative energies and electromagnetic energies. It absorbs and transforms negative energy, while preventing the draining of personal energy in the process.',
		price: 5.75,
		stock: 67,
		color: 'Black',
		size: '1.0 mm',
		type: 'Polished'
	},
	{
		title: 'Raw Rose Quartz',
		description:
			'Rose Quartz is the rosy pink variety of Quartz. Its color is usually soft, ranging from very light pink to medium pink in intensity. It is often hazy or turbid, which makes it lack good transparency.',
		price: 3.45,
		stock: 10,
		color: 'Pink',
		size: '1.0 mm',
		type: 'Raw'
	},
	{
		title: 'Flower Agate Dendrites',
		description:
			'Dendritic agate is a translucent, colorless to whitish-gray variety of chalcedony quartz, easily distinguished by its distinct tree- or fern-like markings known as "dendrites", which are most often brown to black in color.',
		price: 15.23,
		stock: 3,
		color: 'Brown',
		size: '1.0 mm',
		type: 'Polished'
	},
	{
		title: 'Natural Zoisite Gemstone',
		description:
			'Zoisite is a mineral that includes several gem varieties. The most important and well-known is Tanzanite, a sensational blue gemstone. The variety Thulite is used as a minor pink gemstone. A variety known as Ruby Zoisite, which is green Zoisite associated with opaque red Ruby (and often black amphibole streaks), is used as a carving gemstone as well as a minor gem.',
		price: 6.78,
		stock: 8,
		color: 'Green',
		size: '1.0 mm',
		type: 'Raw'
	},
	{
		title: 'Teal Lava Rock',
		description:
			'Besides the classical red/brown lava rock, we will dive in other alternative materials used for fire pits with similar accents such as the black lava rock, black lava glass or obsidian, reflective fire glass, natural fire glass and landscape glass.',
		price: 2.35,
		stock: 67,
		color: 'Blue',
		size: '1.0 mm',
		type: 'Raw'
	},
	{
		title: 'Kambaba Jasper',
		description:
			'Jasper is known as the Stone of Endurance. It’s a gentle, but vital stimulator of chi which brings physical strength, energy, stamina, focus, and determination. Its steady frequency calms the emotional body creating a lasting and stable energy for setting and completing goals, facing unpleasant tasks, and having the courage to right wrongs.',
		price: 35.2,
		stock: 17,
		color: 'Blue',
		size: '1.0 mm',
		type: 'Polished'
	},
	{
		title: 'Natural Moldavite Stone',
		description:
			'Moldavite, also known as the "Bouteille Stone" or as "Vltavin" in Czech, is an olive-green to dull brown-green vitreous gemstone. Moldavite was thought to have been formed by condensed rock vapors after a meteorite impact.',
		price: 22.15,
		stock: 13,
		color: 'Green',
		size: '1.0 mm',
		type: 'Raw'
	}
]

const photos = [
	{
		image:
			'https://img.etsystatic.com/il/ad6e2b/1455198496/il_570xN.1455198496_sp58.jpg?version=1',
		productId: 1
	},
	{
		image:
			'https://img.etsystatic.com/il/eddf57/1455198532/il_570xN.1455198532_2rgd.jpg?version=0',
		productId: 1
	},
	{
		image:
			'https://i.etsystatic.com/iap/46ee8b/1604051835/iap_300x300.1604051835_jvyrugke.jpg?version=0',
		productId: 3
	},
	{
		image:
			'https://img.etsystatic.com/il/5fa555/1374425596/il_570xN.1374425596_9alc.jpg?version=1',
		productId: 2
	},
	{
		image:
			'https://i.etsystatic.com/iap/46ee8b/1604051835/iap_300x300.1604051835_jvyrugke.jpg?version=0',
		productId: 2
	},
	{
		image:
			'https://www.thediamondloupe.com/sites/awdcnewswall/files/Screen%20Shot%202016-09-09%20at%2013.07.44.png',
		productId: 4
	},
	{
		image:
			'https://img.etsystatic.com/il/c5d275/1372882974/il_570xN.1372882974_88v6.jpg?version=0',
		productId: 5
	},
	{
		image:
			'https://img.etsystatic.com/il/ce1e0f/1420152195/il_570xN.1420152195_9h0n.jpg?version=0',
		productId: 5
	},
	{
		image:
			'https://i.etsystatic.com/6245839/r/il/e04d7c/1106499987/il_570xN.1106499987_5b4p.jpg',
		productId: 5
	},
	{
		image:
			'http://cdn.shopify.com/s/files/1/0825/7459/files/ruby_raw_large.jpg?11116142272450580674',
		productId: 6
	},
	{
		image:
			'http://cdn.shopify.com/s/files/1/0825/7459/files/ruby_raw_large.jpg?11116142272450580674',
		productId: 6
	},
	{
		image:
			'https://i.etsystatic.com/7879975/r/il/844cdb/1084234876/il_570xN.1084234876_dvt3.jpg',
		productId: 7
	},
	{
		image:
			'https://i.etsystatic.com/7879975/r/il/78a64b/1084234888/il_570xN.1084234888_8xp2.jpg',
		productId: 7
	},
	{
		image:
			'http://www.vettrigemsusa.com/image/cache/data/0Sapphire/zzzl111-800x800.jpg',
		productId: 8
	},
	{
		image:
			'https://www.worthy.com/blog/wp-content/uploads/2014/06/TitanicHeart-of-the-Ocean.jpg',
		productId: 8
	},
	{
		image:
			'https://www.antiqworld.com/blog/wp-content/uploads/2017/11/opal-833x713.png',
		productId: 9
	},
	{
		image:
			'https://www.antiqworld.com/blog/wp-content/uploads/2017/11/opal-833x713.png',
		productId: 9
	},
	{
		image:
			'https://img.etsystatic.com/il/035732/856848544/il_570xN.856848544_cobh.jpg?version=1',
		productId: 10
	},
	{
		image:
			'https://img.etsystatic.com/il/035732/856848544/il_570xN.856848544_cobh.jpg?version=1',
		productId: 10
	},
	{
		image:
			'https://i.etsystatic.com/16996458/r/il/cf5cab/1595754747/il_570xN.1595754747_e9a3.jpg',
		productId: 11
	},
	{
		image:
			'https://i.etsystatic.com/16996458/r/il/e4d86c/1548298034/il_570xN.1548298034_aysl.jpg',
		productId: 11
	},
	{
		image:
			'https://i.etsystatic.com/10506764/r/il/72bad7/1229973179/il_570xN.1229973179_1smi.jpg',
		productId: 11
	},
	{
		image:
			'https://img.etsystatic.com/il/c8511a/1566584228/il_570xN.1566584228_kxah.jpg?version=0',
		productId: 12
	},
	{
		image:
			'https://img.etsystatic.com/il/c2135c/1614038293/il_570xN.1614038293_j6x8.jpg?version=0',
		productId: 12
	},
	{
		image:
			'https://img.etsystatic.com/il/c8511a/1566584228/il_570xN.1566584228_kxah.jpg?version=0',
		productId: 13
	},
	{
		image:
			'https://img.etsystatic.com/il/c2135c/1614038293/il_570xN.1614038293_j6x8.jpg?version=0',
		productId: 13
	},
	{
		image: 'https://i.ebayimg.com/images/g/cLgAAOSwgY9Xe1BA/s-l300.jpg',
		productId: 14
	},
	{
		image: 'https://i.ebayimg.com/images/g/cLgAAOSwgY9Xe1BA/s-l300.jpg',
		productId: 14
	},
	{
		image:
			'https://i.etsystatic.com/14093570/r/il/af44b5/1365144441/il_570xN.1365144441_lzyo.jpg',
		productId: 15
	},
	{
		image:
			'https://img.etsystatic.com/il/2642ad/1132141037/il_570xN.1132141037_pslj.jpg?version=0',
		productId: 15
	},
	{
		image:
			'https://i.etsystatic.com/12396175/r/il/7fa548/1464057553/il_570xN.1464057553_sipt.jpg',
		productId: 16
	},
	{
		image:
			'https://i.etsystatic.com/12396175/r/il/78d8a5/1416791084/il_570xN.1416791084_tu2p.jpg',
		productId: 16
	},
	{
		image:
			'https://i.etsystatic.com/14050262/r/il/495040/1465610658/il_570xN.1465610658_erbz.jpg',
		productId: 17
	},
	{
		image:
			'https://i.etsystatic.com/14050262/r/il/da2675/1512864927/il_570xN.1512864927_sy91.jpg',
		productId: 17
	}
]

// status 'Created', 'Pending', 'Shipped', 'Delivered' // default pending
const orders = [
	{
		orderTotal: 31.99,
		quantity: 2,
		status: 'Pending',
		datePlaced: '2018-07-23 00:00:00+00:00',
		userId: 1
	},
	{
		orderTotal: 21.74,
		quantity: 1,
		status: 'Created',
		datePlaced: '2018-07-24 00:00:00+00:00',
		userId: 3
	},
	{
		orderTotal: 31.99,
		quantity: 2,
		status: 'Created',
		datePlaced: '2018-07-25 00:00:00+00:00',
		userId: 1
	},
	{
		orderTotal: 29.74,
		quantity: 2,
		status: 'Pending',
		datePlaced: '2018-07-24 00:00:00+00:00',
		userId: 3
	}
]

const orderProducts = [
	{
		productPrice: 14.5,
		productQuantity: 2,
		orderId: 1,
		productId: 3
	},
	{
		productPrice: 18.75,
		productQuantity: 1,
		orderId: 2,
		productId: 5
	},
	{
		productPrice: 3.75,
		productQuantity: 2,
		orderId: 3,
		productId: 7
	},
	{
		productPrice: 9.25,
		productQuantity: 1,
		orderId: 4,
		productId: 5
	},
	{
		productPrice: 17.5,
		productQuantity: 1,
		orderId: 4,
		productId: 11
	}
]

async function seed() {
	await db.sync({ force: true })
	console.log('db synced!')
	// Whoa! Because we `await` the promise that db.sync returns, the next line will not be
	// executed until that promise resolves!
	const users = await Promise.all([
		User.create({
			firstName: 'Cody',
			lastName: 'Pug',
			email: 'cody@email.com',
			password: '123',
			isGuest: false
		}),
		User.create({
			firstName: 'Murph',
			lastName: 'Soap',
			email: 'murphy@email.com',
			isAdmin: true,
			password: '123',
			isGuest: false
		}),
		User.create({
			isGuest: true
		})
	])

	await Promise.all(products.map(product => Product.create(product)))
	await Promise.all(reviews.map(review => Review.create(review)))
	await Promise.all(photos.map(photo => Photo.create(photo)))
	await Promise.all(orders.map(order => Order.create(order)))
	await Promise.all(
		orderProducts.map(orderProduct => OrderProducts.create(orderProduct))
	)
	// Wowzers! We can even `await` on the right-hand side of the assignment operator
	// and store the result that the promise resolves to in a variable! This is nice!
	console.log(`seeded ${users.length} users`)
	console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
