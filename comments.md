# Code Review I

## Workflow

	- Read.ME
		1) Name of project
		2) Instructions for running locally
		3) Link to deployed version

	- Good use of user stories! Make sure you incorporate all horizontal pieces of vertical slice in your individual tix!

	- Semantic commit messages:
		1) Nature of commit (Fix, Refactor, Feature, Documentation, etc)
		2) Area of commit coverage(Models, API, Redux, Auth, etc)
		3) Present-tense description of what commit does

		`Feature (auth): Users can now log in with Github credentials`

		VS

		`Auth better now`

## Models

	- include `db.define()` calls for any through tables that you wanna add more columns to
	- Good job saving db space in your one-to-many associations! 
	- Sequelize.Array should be avoided. Why?
	- Great use of Sequelize.ENUM
	- How are we baking cart into models/API?
	- Good job making Cart ENUM property of Order. Don't forget to also reference on req.session (&& / ||) browser Localstorage for relevant User Stories
 	- Quantity should be prop of Order_Product not Order
 	- Sequelize.DECIMAL or Sequelize.INTEGER w/ a getter method for price


## Routes

	- Product Routes could be more RESTful

