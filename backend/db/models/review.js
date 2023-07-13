'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spot'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        emptyString(value){
          if(!value) throw new Error('Review text is required.')
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, 
        max: 5,
        isNumeric: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};