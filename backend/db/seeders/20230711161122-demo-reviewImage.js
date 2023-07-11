'use strict';
const { ReviewImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1, 
        url: 'ImageUrl4'
      },
      {
        reviewId: 2, 
        url: 'ImageUrl5'
      },
      {
        reviewId: 3, 
        url: 'ImageUrl6'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['imageUrl4', 'imageUrl5', 'imageUrl6'] }
    }, {});
  }
};
