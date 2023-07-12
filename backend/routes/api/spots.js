const express = require('express');

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, sequelize, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// //creates a new spot
// router.post('/', async (req, res) => {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;
//     const owner = await User.findOne()
//     const newSpot = await Spot.create({
//     ownerId: owner.id,
//     address,
//     city, 
//     state,
//     country, 
//     lat, 
//     lng, 
//     name, 
//     description, 
//     price  
//     })

//     res.json(newSpot); 
// })

//get all spots
router.get('/', async (req, res) => {
    // const image = {};
    const spots = await Spot.findAll({
        include:{
            model: Review,
            attributes: [],
          },
          attributes: {
            include: [
                // ['url', 'previewImage'],
              [
                sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'
              ], 
            ],
          },
    //     attributes: [['Review.url', 'previewImage'],  
    //         [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'
    //       ],
    //     ]
    // });
    // const avgRating = await Review.findAll({
    //     include: {
    //         attributes: ['stars'],
    //     },
    //     attributes: {
    //         include: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
    //     }
    });

    // image.previewImage = await SpotImage.findOne({
    //     include: {
    //         model: spots,
    //         where: {
    //             spotId: {
    //                 [Op.eq]: spots.id
    //             }
    //     },
    //     },
    //     attributes: [['url', 'previewImage']]
    // })
    // console.log(image)
    console.log(spots);
    res.json(spots);
});
  


module.exports =  router;