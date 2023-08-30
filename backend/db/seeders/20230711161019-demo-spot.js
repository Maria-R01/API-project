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
        address: '123 Oklahoma St',
        city: 'Oklahoma City',
        state: 'Oklahoma',
        country: 'United States of America',
        lat: 35.29,
        lng: 97.32,
        name: 'Oklahoma Oasis',
        description: 'Beautiful location in Oklahoma City. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
        price: 54.55 
      },
      {
        ownerId: 2,
        address: '456 Pasadena St',
        city: 'Pasadena',
        state: 'California',
        country: 'United States of America',
        lat: 34.162004,
        lng: -118.137649,
        name: 'Picture Perfect Pasadena.',
        description: 'Great location Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
        price: 489.54
      },
      {
        ownerId: 3,
        address: '789 Kansas St',
        city: 'Kansas City',
        state: 'Kansas',
        country: 'United States of America',
        lat: 37.605,
        lng: -98.58,
        name: 'Kickin it in Kansas',
        description: 'Explore the midwest through this location. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 250
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Oklahoma St', '456 Pasadena St', '789 Kansas St'] }
    }, {});
  }
};
