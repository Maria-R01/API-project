const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//creates a new spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const owner = await User.findOne()
    const newSpot = await Spot.create({
    ownerId: owner.id,
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

//get all spots
router.get('/', async (req, res) => {
    const avgRating = await Review.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
  });
    const Spots = await Spot.findAll({
      // attributes: {
      //   include: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
      // },
      //   attributes: {
      //     include: [
      //       [
      //         sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'
      //       ],
      //     ]
      // },
        //   // attributes: {
        //   //   include: [
        //   //       // ['url', 'previewImage'],
        //   //     [
        //   //       sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'
        //   //     ], 
        //   //   ],
        //   // },
        // attributes: [  
        //     [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
        // ]
    });

    // for(let i = 0; i < Spots.length; i++){
    //   const obj = Spots[i].toJSON();

    // }

    res.json({Spots});
    // res.json(avgRating)
});
  


module.exports = router;