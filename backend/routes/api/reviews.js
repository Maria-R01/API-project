const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Review, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const review = require('../../db/models/review');
const router = express.Router();

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
    

//GET ALL REVIEWS CURRENT USER
router.get('/current', requireAuth, async(req, res)=> {
    const { user } = req;
    const reviewArr = [];
    let reviews = await Review.findAll({
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
            // where: {
            //     id: review.id
            // },
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

//ADD IMAGE TO REVIEW SPECIFIED BY REVIEW ID
router.post('/:reviewId/images', requireAuth, async(req, res)=> {
    const { url } = req.body;
    const { user } = req;
    let reviewById = await Review.findByPk(req.params.reviewId, {
        include: [{
            model: ReviewImage
        }]
    });
    if(!reviewById) return res.status(404).json({message: "Review couldn't be found"})
    reviewById = reviewById.toJSON();
    if(user.id !== reviewById.userId) return res.status(403).json({message: 'Forbidden'});
    if(reviewById.ReviewImages.length >= 10) return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    let newImage = await ReviewImage.create({
        url,
        reviewId: reviewById.id
    })
    const newImageRes = await ReviewImage.findByPk(newImage.id, {
        attributes: {
            exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
    })
    res.status(201).json(newImageRes)
})


//EDIT A REVIEW
router.put('/:reviewId', requireAuth, validateReview, async(req, res)=>{
    const reviewId = req.params.reviewId;
    const { user } = req;
    const { review, stars } = req.body;
    let reviewById = await Review.findByPk(reviewId);
    if(!reviewById) return res.status(404).json({message: "Review couldn't be found"});
    // reviewById = reviewById.toJSON();
    if(user.id === reviewById.userId){
        await reviewById.update({
            review,
            stars
        });
        res.json(reviewById);
    } else {
        return res.status(403).json({message: 'Forbidden'});
    }
})

//DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async(req, res) =>{
    const reviewId = req.params.reviewId;
    const { user } = req;
    let reviewById = await Review.findByPk(reviewId);
    if(!reviewById) return res.status(404).json({message: "Review couldn't be found"});
    // reviewById = reviewById.toJSON();
    if(user.id === reviewById.userId){
        await reviewById.destroy();
        res.json({message: "Successfully deleted"})
    } else {
        return res.status(403).json({message: 'Forbidden'});
    }
})

module.exports = router;
