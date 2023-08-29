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
        url: 'https://a0.muscache.com/im/pictures/79d1f66a-3281-46bd-823b-16be790c2425.jpg?im_w=1200'
      },
      {
        reviewId: 2, 
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/dab0ab48-6f5d-44aa-96a4-e7090e7b70dd.jpeg?im_w=1200'
      },
      {
        reviewId: 3, 
        url: 'https://a0.muscache.com/im/pictures/54b4217d-2bbc-4442-aa56-049e83cf23ad.jpg?im_w=1200'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
