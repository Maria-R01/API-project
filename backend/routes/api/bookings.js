const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//GET ALL BOOKINGS FOR CURRENT USER
router.get('/current', requireAuth, async(req, res) => {
    const { user } = req;
    let bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
    });
    const bookingsArr = [];
    for(let booking of bookings) {
        booking = booking.toJSON();
        let bookingsSpot = await Spot.findByPk(booking.spotId, {
            attributes: {
                exclude: ['createdAt', 'id', 'updatedAt']
            }
        });
        let previewImage = await SpotImage.findOne({
            where: { preview: true },
            attributes: {
                exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt']
            }
        });
        bookingsSpot = bookingsSpot.toJSON();
        previewImage = previewImage.toJSON();
        bookingsSpot.previewImage = previewImage.url;
        booking.Spot = bookingsSpot;
        bookingsArr.push(booking);
    }
    res.json({Bookings: bookingsArr})
})

//EDIT A BOOKING
router.put('/:bookingId', requireAuth, async(req, res)=>{
    res.send('success')
});

//DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async(req, res)=>{
    res.send('success')
});

module.exports = router;
