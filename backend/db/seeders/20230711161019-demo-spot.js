'use strict';
const { Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Fake St',
        city: 'Fake City',
        state: 'California',
        country: 'United States of America',
        lat: ,
        lng: ,
        name: ,
        description: ,
        price: 
      },
      {
        ownerId: 2,
        address: ,
        city: ,
        state: ,
        country: ,
        lat: ,
        lng: ,
        name: ,
        description: ,
        price: 
      },
      {
        ownerId: 3,
        address: ,
        city: ,
        state: ,
        country: ,
        lat: ,
        lng: ,
        name: ,
        description: ,
        price: 
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
