'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// Order Model
const db = require('../server/models');
const Order = db.model('order');
const OrderProducts = db.model('orderProducts')
const User = db.model('user')

// Order Routes
const app = require('../server/app');
const agent = require('supertest')(app);

// Checkout component
// import { shallow } from 'enzyme';
import React from 'react';
import Checkout from '../client/components/order/checkout';

// Redux
import { SET_CAMPUSES, setCampuses } from '../client/store/action-creators';
import rootReducer from '../client/store/reducers';

describe('Place Order', () => {

  // defined in ../server/api/orders.js
  describe('Order routes', () => {
    let storedOrders;

    const orderData = [
      {
        name: 'Grace Hopper'
      },
      {
        name: 'Fullstack Academy'
      }
    ];

    beforeEach(async () => {
      const createdOrders = await Order.bulkCreate(orderData)
      storedOrders = createdOrders.map(order => order.dataValues);
    });

    // Route for fetching all orders
    describe('GET /api/order', () => {
      it('serves up all Orders', async () => {
        const response = await agent
          .get('/api/orders')
          .expect(200);
        expect(response.body).to.have.length(2);
        expect(response.body[0].name).to.equal(storedCampuses[0].name);
      });
    });

    // Route for fetching a single campus
    describe('GET /api/campuses/:id', () => {
      xit('serves up a single Campus by its id', async () => {
        const response = await agent
          .get('/api/campuses/1')
          .expect(200);
        expect(response.body.name).to.equal('Grace Hopper');
      });
    });
  });


  describe('Front-End', () => {

    const campuses = [
      { name: 'New York' },
      { name: 'Chicago' },
      { name: 'Pluto' }
    ];
    // defined in ../client/components/CampusList.js
    describe('<CampusList /> component', () => {
      xit('renders an unordered list', () => {
        const wrapper = shallow(<CampusList campuses={[]} />);
        expect(wrapper.find('ul')).to.have.length(1);
      })

      xit('renders list items for the campuses passed in as props', async () => {
        const campusRecords = await Campus.bulkCreate(campuses)
        //we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
        const wrapper = shallow(<CampusList campuses={campusRecords} />);
        const listItems = wrapper.find('li');
        expect(listItems).to.have.length(3);
        expect(listItems.at(2).text()).to.contain('Pluto');
      });
    });

    // defined in ../client/redux/actions.js
    describe('`setCampuses` action creator', () => {
      const setCampusesAction = setCampuses(campuses);

      xit('returns a Plain Old JavaScript Object', () => {
        expect(typeof setCampusesAction).to.equal('object');
        expect(Object.getPrototypeOf(setCampusesAction)).to.equal(Object.prototype);
      });

      xit('creates an object with `type` and `campuses`', () => {
        expect(setCampusesAction.type).to.equal(SET_CAMPUSES);
        expect(Array.isArray(setCampusesAction.campuses)).to.be.true; // eslint-disable-line no-unused-expressions
        expect(setCampusesAction.campuses[2].name).to.equal('Pluto');
      });

    });

    // defined in ../client/redux/reducer.js
    describe('reducer', () => {
      const initialState = {
        campuses: []
      };

      const newState = reducer(
        initialState,
        {
          type: SET_CAMPUSES,
          campuses: campuses
        }
      )

      xit('returns a new state with the updated campuses', () => {
        expect(newState.campuses).to.deep.equal(campuses);
      });

      xit('does not modify the previous state', () => {
        expect(initialState).to.deep.equal({
          campuses: []
        });
      });

    });
  });

});

