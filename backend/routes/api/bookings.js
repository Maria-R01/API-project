const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking } = require('../../db/models');
const booking = require('../../db/models/booking');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

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
    const { startDate, endDate } = req.body;
    const { user } = req;
    let editedBooking = await Booking.findByPk(req.params.bookingId);
    if(!editedBooking) res.status(404).json({ message: "Spot couldn't be found"});
    const { Op } = require('sequelize');
    const bookingDatesCheck = await Booking.findOne({
            where: {
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
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
    });
    editedBooking.toJSON();
    if(user.id === editedBooking.userId){
        await editedBooking.update({
        startDate, 
        endDate
        });
        res.json(editedBooking)
    } else res.status(403).json({ message: 'Forbidden'})
});

//DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async(req, res)=>{
    const { user } = req;
    const bookingToDelete = await Booking.findByPk(req.params.bookingId);
    if(!bookingToDelete) {
        res.status(404).json({
        message: "Spot couldn't be found"
        })
    } else {
        if(user.id === bookingToDelete.userId){
        console.log(bookingToDelete.startDate.slice(0, 10))
        console.log(bookingToDelete.startDate.slice(0, 10) <= new Date().toISOString().slice(0, 10))
        if(bookingToDelete.startDate.slice(0, 10) <= new Date().toISOString().slice(0, 10)) return res.status(403).json({message: "Bookings that have been started can't be deleted"})
        await bookingToDelete.destroy();
        res.json({
        message: "Successfully deleted"
        })
    } else {
        res.status(403).json({ message: 'Forbidden'})
    }
    } 
});

module.exports = router;
