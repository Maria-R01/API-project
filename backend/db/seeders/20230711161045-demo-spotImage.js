'use strict';
const { SpotImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/653d898a-e056-4799-a563-d1bbaace3f93.jpg?im_w=960',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/c70900db-075e-4c43-9f82-4d86e318d8a7.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/9e571542-3978-4c3b-9de2-6d59f0626156.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/f5e5d3cd-5fc5-440b-80e4-0935ffc0cfe4.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/bb09d4b6-4bfd-46bb-9f00-3d2ed2380042.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-918850454924096015/original/1018d3ab-deff-4285-9086-8ed05055c2d1.jpeg?im_w=960',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/22da76c6-e39c-4c0c-8dc9-5ed88a199b99.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/d9680a23-938b-47ec-808f-2c3d252be824.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/d6b5ca99-2565-442c-8c7a-ba631947c7a1.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/2aef3755-0b39-4107-ab39-5aa42b73b447.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/f82a8df0-9a52-46fb-934e-e49ccbe5ce46.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/00595858-218b-404f-9c6d-8c914520bd8b.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/86729e89-1bc5-45a0-be4c-5520c732255c.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/b2b198f5-9ede-4767-9fa7-820c100c35cc.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-748537852797897390/original/9f87f00e-a912-4479-8e7d-0c4d6b0b831c.jpeg?im_w=1200',
        preview: true,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
