const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//GET ALL SPOTS:
router.get('/', async (req, res) => {
  const Spots = [];
    const allSpots = await Spot.findAll({
      // include: {
      //   model: Review,
      //   attributes: {
      //     include: [
      //       [
      //         sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'
      //       ],
      //     ]
      // },
      // }
    });
  for(let spotObj of allSpots){
    let sum = 0;
    
    spotObj = spotObj.toJSON();

    //GETTING THE AVG RATING BASED ON spotId
    let ratings = await Review.findAll({
      where: {
        spotId: spotObj.id
      }
    });
    for(let rating of ratings){
      rating = rating.toJSON();
      sum += rating.stars;
    }
    let avg = sum / ratings.length;
    //ADD IN AVGRATING INTO SPOT POJO
    spotObj.avgRating = avg;

    //GET PreviewImg URL 
    let spotImage = await SpotImage.findOne({
      where: {
        preview: true,
      }
    });
    spotImage = spotImage.toJSON();
    //ADD IN PREVIEW IMAGE INTO SPOT POJO
    spotObj.previewImage = spotImage.url
    //PUSH SPOT POJO INTO SPOTS ARRAY
    Spots.push(spotObj);
  }

  res.json({Spots});
});

//GET ALL SPOTS OWNED BY CURRENT USER
router.get('/current', requireAuth, async(req, res) =>{
  const { user } = req;

  const Spots = [];
  const allSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  });
  for(let spotObj of allSpots){
    let sum = 0;
    spotObj = spotObj.toJSON();
    //GETTING THE AVG RATING BASED ON spotId
    let ratings = await Review.findAll({
      where: {
        spotId: spotObj.id
      }
    });
    for(let rating of ratings){
      rating = rating.toJSON();
      sum += rating.stars;
    }
    let avg = sum / ratings.length;
    //ADD IN AVGRATING INTO SPOT POJO
    spotObj.avgRating = avg;

    //GET PreviewImg URL 
    let spotImage = await SpotImage.findOne({
      where: {
        preview: true,
      }
    });
    spotImage = spotImage.toJSON();
    //ADD IN PREVIEW IMAGE INTO SPOT POJO
    spotObj.previewImage = spotImage.url
    //PUSH SPOT POJO INTO SPOTS ARRAY
    Spots.push(spotObj);
  }
  res.json({Spots})
});

//GET DETAILS OF SPOT BY ID
router.get('/:spotId', async(req, res) => {
  const spotId = req.params.spotId;
  
});

//creates a new spot
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  // const owner = await User.findOne()
  const { user } = req;
  const newSpot = await Spot.create({
  ownerId: user.id,
  address,
  city, 
  state,
  country, 
  lat, 
  lng, 
  name, 
  description, 
  price  
  })

  res.json(newSpot); 
}, handleValidationErrors)

//DELETE A SPOT 
router.delete('/:spotId', requireAuth, async(req, res) => {
  const spotById = await Spot.findByPk(req.params.spotId);
  if(!spotById) {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  } else {
    await spotById.destroy();
    res.json({
      message: "Successfully deleted"
    })
  }
})

module.exports = router;