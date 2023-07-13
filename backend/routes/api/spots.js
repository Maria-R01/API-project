const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .notEmpty({checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .notEmpty({checkFalsy: true})
    .withMessage('State is required'),
  check('country')
    .notEmpty({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .notEmpty()
    .withMessage('Latitude is not valid'),
  check('lng')
    .notEmpty({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .notEmpty({ checkFalsy: true })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .notEmpty({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .notEmpty({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

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

//CREATE A NEW SPOT
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
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
  
  res.status(201).json(newSpot); 
})


//GET DETAILS OF SPOT BY ID
router.get('/:spotId', async(req, res) => {
  const spotId = req.params.spotId;
  let spotById = await Spot.findByPk(spotId, {
    include: [{
      model: SpotImage,
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
      }
    }, {
      model: User,
      as: 'Owner',
      attributes: ['id', 'firstName', 'lastName']
    }
  ]
  });
  if(!spotById) res.status(404).json({ message: "Spot couldn't be found"})
  const ratings = await Review.findAll({
    where: {
      spotId
    },
    attributes: {
      exclude: ['spotId', 'userId', 'review', 'createdAt', 'updatedAt']
    }
  })
  let sum = 0;
  let numOfReviews = 0;
  for(let rating of ratings){
    rating = rating.toJSON();
    sum += rating.stars;
    numOfReviews++;
  }
  let avg = sum / ratings.length;

  spotById = spotById.toJSON();
  spotById.numReviews = numOfReviews;
  spotById.avgStarRating = avg;

  res.json(spotById);
});

//EDIT A SPOT
router.put('/:spotId', requireAuth, validateSpot, async(req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const { user } = req;
  let editedSpot = await Spot.findByPk(req.params.spotId);
  if(!editedSpot) res.status(404).json({ message: "Spot couldn't be found"});
  editedSpot.toJSON();
  if(user.id === editedSpot.ownerId){
    await editedSpot.update({
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
    });
    res.json(editedSpot)
  } else res.status(403).json({ message: 'Forbidden'})
  
})


//DELETE A SPOT 
router.delete('/:spotId', requireAuth, async(req, res) => {
  const { user } = req;
  let spotById = await Spot.findByPk(req.params.spotId);
  if(!spotById) {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  } else {
    if(user.id === spotById.ownerId){
    await spotById.destroy();
    res.json({
      message: "Successfully deleted"
    })
  } else {
    res.status(403).json({ message: 'Forbidden'})
  }
  }
})

module.exports = router;