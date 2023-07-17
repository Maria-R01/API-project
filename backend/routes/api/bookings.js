const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Booking } = require("../../db/models");
const booking = require("../../db/models/booking");
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//GET ALL BOOKINGS FOR CURRENT USER
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  let bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
  });
  const bookingsArr = [];
  for (let booking of bookings) {
    booking = booking.toJSON();
    let bookingsSpot = await Spot.findByPk(booking.spotId, {
      attributes: {
        exclude: ["createdAt", "id", "updatedAt"],
      },
    });
    let previewImage = await SpotImage.findOne({
      where: { preview: true },
      attributes: {
        exclude: ["id", "spotId", "preview", "createdAt", "updatedAt"],
      },
    });
    bookingsSpot = bookingsSpot.toJSON();
    previewImage = previewImage.toJSON();
    bookingsSpot.previewImage = previewImage.url;
    booking.Spot = bookingsSpot;
    bookingsArr.push(booking);
  }
  res.json({ Bookings: bookingsArr });
});

//EDIT A BOOKING
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { Op } = require('sequelize');
  const { user } = req;
  const { startDate, endDate } = req.body
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" })
  }

  if (booking.userId !== user.id) {
      return res.status(403).json({ message: "Forbidden" })
  }

  const spotAvailability = await Booking.findOne({
      where: {
          [Op.or]: [
              {
                  startDate: { 
                    [Op.between]: [startDate, endDate] 
                  }
              },
              {
                  endDate: { 
                    [Op.between]: [startDate, endDate] 
                  }
              },
          ]
      }
  })

  if (spotAvailability) {
      return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking"
          }
      })
  }

  if (endDate <= new Date()) {
      return res.status(403).json({ message: "Past bookings can't be modified" })
  }

  const setObj = {}

  if (startDate) {
      setObj.startDate = startDate
  }
  if (endDate) {
      setObj.endDate = endDate
  }

  booking.set(setObj)
  await booking.save()

  res.json(booking)

});

//DELETE A BOOKING
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;
  let bookingToDelete = await Booking.findByPk(req.params.bookingId);
  if (!bookingToDelete) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  } else {
    if (user.id === bookingToDelete.userId) {
    //   bookingToDelete = bookingToDelete.toJSON();
    //   console.log(typeof bookingToDelete.startDate);
    //   console.log('Booking obj start date ', bookingToDelete.startDate)
    //   console.log('new Date(): ', new Date())
      if (bookingToDelete.startDate <= new Date()) {
        return res
          .status(403)
          .json({
            message: "Bookings that have been started can't be deleted",
          });
      }
      await bookingToDelete.destroy();
      return res.json({
        message: "Successfully deleted",
      });
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
});

module.exports = router;
