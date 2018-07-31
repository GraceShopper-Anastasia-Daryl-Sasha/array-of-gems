const db = require('../db/models');
before(() => db.sync({ force: true }));
afterEach(() => db.sync({ force: true }));
