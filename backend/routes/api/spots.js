const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
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

const validateReview = [
check('review')
  .notEmpty({ checkFalsy: true })
  .withMessage('Review Text is required'),
check('stars')
  .notEmpty({ checkFalsy: true })
  .isNumeric({ checkFalsy: true })
  .withMessage('Stars must be an integer from 1 to 5'),
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

//ADD IMAGE TO SPOT BASED ON SPOT'S ID
router.post('/:spotId/images', requireAuth, async(req, res) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const { url, preview } = req.body;
  const newImageRes = {}
  let spotById = await Spot.findByPk(spotId);
  if(!spotById) return res.status(404).json({message: "Spot couldn't be found"}); 
  spotById = spotById.toJSON();
  if(user.id !== spotById.ownerId) {
    res.status(403).json({message: 'Forbidden'})
  } else {
    const newImage = await SpotImage.create({
      spotId: spotById.id,
      url, 
      preview,
    });
    newImageRes.id = newImage.id
    newImageRes.url = newImage.url;
    newImageRes.preview = newImage.preview;
    res.status(201).json(newImageRes)
  }
})

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
  const spotById = await Spot.findByPk(req.params.spotId);
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

//GET ALL REVIEWS BY SPOT ID
router.get('/:spotId/reviews', async(req, res) =>{
  const reviewsArr = [];
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [{
      model: User,
    }]
  })
  if(!reviews.length) return res.status(404).json({message: "Spot couldn't be found"});
  for(let review of reviews) {
    review = review.toJSON();
    delete review.User.username
    const reviewImagesArr = [];
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id
      },
      attributes: {
        exclude: ['reviewId', 'createdAt', 'updatedAt']
      }
    })
    for(let reviewImage of reviewImages){
      reviewImage = reviewImage.toJSON();
      reviewImagesArr.push(reviewImage)
    }
    review.ReviewImages = reviewImagesArr;
    reviewsArr.push(review);
  }
  res.json({Reviews: reviewsArr})
})

//CREATE A REVIEW FOR SPOT BASED ON SPOT ID
router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res) =>{
  const { review, stars }= req.body;
  const { user }= req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if(!spot) return res.status(404).json({message: "Spot couldn't be found"})
  const reviewChecker = await Review.findOne({
    where: {
      userId: user.id,
    }
  })
  if(reviewChecker) {
    return res.status(500).json({message: "User already has a review for this spot"})
  } else {
    let newReview = await Review.create({
      review,
      stars,
      userId: user.id,
      spotId: spotId
    })
    res.status(201).json(newReview);
  }
  
})

//GET BOOKINGS FOR SPOT BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async(req, res)=> {
  const { user } = req;
  const spotId = req.params.spotId;
  let bookings = await Booking.findAll({
    where: {
      id: spotId
    }
  });
  if(!bookings.length) return res.status(404).json({message: "Spot couldn't be found"});
  for(let booking of bookings){
    booking = booking.toJSON();
    const bookingsArr = [];
    const bookingObj = {};
    if(user.id !== booking.userId){
      bookingObj.spotId = booking.spotId;
      bookingObj.startDate = booking.startDate;
      bookingObj.endDate = booking.endDate;
      bookingsArr.push(bookingObj);
      res.json({Bookings: bookingsArr});
    } else {
      let userObj = await User.findByPk(booking.userId);
      userObj = userObj.toJSON();
      delete userObj.username;
      bookingObj.id = booking.id;
      bookingObj.spotId = booking.spotId;
      bookingObj.userId = booking.userId;
      bookingObj.startDate = booking.startDate;
      bookingObj.endDate = booking.endDate;
      bookingObj.createdAt = booking.createdAt;
      bookingObj.updatedAt = booking.updatedAt;
      bookingObj.User = userObj;
      bookingsArr.push(bookingObj);
      res.json({Bookings: bookingsArr});
    }
  }
})

//CREATE BOOKING FROM A SPOT'S ID
router.post('/:spotId/bookings', requireAuth, async(req, res)=>{
  const { user } = req;
  const spotId = req.params.spotId;
  const { startDate, endDate } = req.body;
  let spotById = await Spot.findByPk(spotId);
  if(!spotById) return res.status(404).json({
    "message": "Spot couldn't be found"
  });
  spotById = spotById.toJSON();
  if(user.id === spotById.id) return res.status(403).json({message: 'Forbidden'});
  const { Op } = require('sequelize');
  let bookingDatesCheck = await Booking.findOne({
    where: {
      userId: user.id,
      [Op.or]: [{
        startDate: {
          [Op.between]: [startDate, endDate]
        },
        endDate: {
          [Op.between]: [startDate, endDate]
        }
      }]
    }
  });
  if(bookingDatesCheck) return res.status(403).json({
    "message": "Sorry, this spot is already booked for the specified dates",
    "errors": {
      "startDate": "Start date conflicts with an existing booking",
      "endDate": "End date conflicts with an existing booking"
    }
  })
  const newBooking = await Booking.create({
    spotId: spotById.id,
    userId: spotById.ownerId,
    startDate,
    endDate
  })

  res.status(201).json(newBooking);
})


module.exports = router;