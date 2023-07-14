const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const { restoreUser, requireAuth } = require("../../utils/auth.js");
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

//DELETE SPOT IMAGE
router.delete('/spot-images/:imageId', requireAuth, async(req, res)=> {
  const { user } = req;
  const imageToDelete = await SpotImage.findByPk(req.params.imageId, {
    include: [{
      model: Spot,
    }]
  });
  if(!imageToDelete) {
      res.status(404).json({
      message: "Spot couldn't be found"
      })
  } else {
      if(user.id === imageToDelete.Spot.ownerId){
      await imageToDelete.destroy();
      res.json({
      message: "Successfully deleted"
      })
  } else {
      res.status(403).json({ message: 'Forbidden'})
  }
  }
})

//DELETE REVIEW IMAGE
router.delete('/review-images/:imageId', requireAuth, async(req, res)=> {
  const { user } = req;
  const imageToDelete = await ReviewImage.findByPk(req.params.imageId, {
    include: [{
      model: Review,
    }]
  });
  if(!imageToDelete) {
      res.status(404).json({
      message: "Spot couldn't be found"
      })
  } else {
      if(user.id === imageToDelete.Review.userId){
      await imageToDelete.destroy();
      res.json({
      message: "Successfully deleted"
      })
  } else {
      res.status(403).json({ message: 'Forbidden'})
  }
  }
})

//TEST ENDPOINT
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



module.exports = router;