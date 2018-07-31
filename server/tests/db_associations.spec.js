const db = require('../db');
const Order = db.model('order')
const Users = db.model('user')
const Products = db.model('product')
import NewReview from '../../client/components/newReview'

import React from 'react'
import { shallow } from 'enzyme'
const {expect} = require('chai')
const app = require('../index');
const agent = require('supertest')(app);
const sinon = require('sinon');
const Promise = require('bluebird')


describe('User Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let user;
  beforeEach(async () => {
      user = await Users.create({
       firstName: 'Cody',
       lastName: 'Pug',
       email: 'cody@email.com'
      });
    return user;
  });

  it('has userId', () => {
    expect(user.id).to.equal(1)
  })

});

describe('Order Association', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('sets association between user and order', () => {

    let user = Users.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com'
     });

    let order = Order.create({
       orderTotal: 31.99,
       quantity: 2,
       status: 'Pending'
    });

    return Promise.all([user, order])
    .spread((user, order) => {
    return user.setOrders(order)
    })
   .then(() => {
     return Order.findOne({
       where: {userId: 1},
       include: {model: Users}
     })
    })
   .then((foundOrder) => {
    expect(foundOrder.userId).to.exist; // eslint-disable-line no-unused-expressions
    expect(foundOrder.userId).to.equal(1);
  });

  })

});


describe('GET /api/products/singleProduct', () => {
  let storedProducts;

    const products = [
      {
        title: 'Amethyst Cluster', description: 'Amethyst is a well known mineral and gemstone. It is the purple variety of the mineral Quartz, and its most valuable and prized variety. Its name derives from the Greek "amethystos", which means "not drunken", as Amethyst in antiquity was thought to ward off drunkenness.', price:	5.55, stock:	72, type: 'Birthstone',	size: '1.0 mm', color: 'Purple'
      },
      {
        title: 'Polished Fire Garnet',	description: 'This beautiful stone, which is most commonly red but can be found in a range of other colors, symbolizes peace, prosperity and good health.', price: 6.95, stock: 25,type: 'Birthstone',	size: '1.0 mm',	color: 'Green'
      }
    ];

    beforeEach(async () => {
      const createdProducts = await Products.bulkCreate(products)
      storedProducts = createdProducts.map(product => product.dataValues);
    });

  describe('GET /api/products/:productId', () => {
    it('serves up a single product', async () => {
      const response = await agent
        .get('/api/products/1')
        .expect(200)
      expect(response.body.title).to.equal('Amethyst Cluster')
    })
  })

})

describe('Front-End', () => {
  describe('<NewReviews /> component', () => {

  let renderedReviewForm;
  let reviewInstance;

  beforeEach(() => {
    renderedReviewForm = shallow(<NewReview />);
    reviewInstance = renderedReviewForm.instance();
  })

  it('should be a class component with an initial local state', () => {
    expect(reviewInstance).to.exist; // eslint-disable-line no-unused-expressions
    expect(reviewInstance.state).to.eql({title: '', rating: 0, comment: ''});
  })

  it('should have a method called handleInputChange that is invoked when there is a change event triggered by the <input /> element', () => {
    expect(typeof reviewInstance.handleInputChange).to.equal('function')
    const handleInputChangeSpy = sinon.spy()
    reviewInstance.handleInputChange = handleInputChangeSpy;
    renderedReviewForm.setState({})
    renderedReviewForm.find('input').simulate('change', {
      target: { title: 'Test' }
    })
  })

  });
});

