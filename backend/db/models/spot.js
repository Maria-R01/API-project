'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      })
      // Spot.hasMany(models.Booking, {
      //   foreignKey: 'spotId',
      //   onDelete: 'CASCADE',
      //   hooks:true,
      // })
      Spot.belongsToMany(
        models.User, {
          through: models.Booking,
          foreignKey: 'spotId',
          otherKey: 'userId'
        }
      )
      Spot.belongsToMany(
        models.User, {
          through: models.Review,
          foreignKey: 'spotId',
          otherKey: 'userId'
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   len: [9, 40],
      // }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        // len: [4, 13],
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        // len: [2, 30],
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        // len: [4, 35]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        // isNumeric: true,
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        // isNumeric: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        // isAlpha: true,
        // len: [4, 49]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
        // isNumeric: true
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};