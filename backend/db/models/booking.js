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
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        checkBookingDates() {
          if (this.startDate >= this.endDate) {
            throw new Error("endDate cannot be on or before startDate", { statusCode: 404 });
          }
        },
        endDateInPast() {
          if(this.endDate < new Date().toISOString().slice(0, 10)) {
            throw new Error("Past bookings can't be modified", { statusCode: 404 })
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};