'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spot'
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};