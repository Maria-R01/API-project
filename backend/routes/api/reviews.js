const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

const router = express.Router();

//GET ALL REVIEWS CURRENT USER
router.get('/current', requireAuth, async(req, res)=> {
    const { user } = req;
    const reviewArr = [];
    let reviews = await Review.findAll({
        attributes: {
            include: ['id']
        },
        include: [{
            model: User,
            where: {
                id: user.id
            },
        }]
    })
    for(let review of reviews){
        review = review.toJSON();
        delete review.User.username
        let spot = await Spot.findOne({
            where: {
                id: review.spotId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        spot = spot.toJSON();
        let previewImage = await SpotImage.findOne({
            where: {
                preview: true,
            }
        })
        previewImage = previewImage.toJSON();
        spot.previewImage = previewImage.url;
        review.Spot = spot;

        let reviewImages = await ReviewImage.findAll({
            where: {
                id: user.id
            },
            attributes: {
                exclude: ['reviewId', 'createdAt', 'updatedAt']
            }
        })
        const reviewImageArr = [];
        for(let reviewImage of reviewImages){
            reviewImage = reviewImage.toJSON();
            reviewImageArr.push(reviewImage);
        }
        review.ReviewImages = reviewImageArr;
        reviewArr.push(review);
    }
    res.json({Reviews: reviewArr})
}) 



module.exports = router;
