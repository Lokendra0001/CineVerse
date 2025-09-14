// bookingRoutes.js
const express = require("express");
const BookingTicket = require("../models/booking-model.js");
const checkAuthentication = require("../middleware/auth.js");
const router = express.Router();

// Get booked seats for a show
router.post("/getAllBookedSeats", async (req, res) => {
    const { movie, theater, showTime } = req.body;


    try {
        const bookings = await BookingTicket.find({
            movie,
            theater,
            showTime,
            status: "booked"
        });


        // Extract only seat numbers
        const bookedSeats = bookings.flatMap(b => b.seats);
        res.json({ bookedSeats });

    } catch (err) {
        res.status(500).json({ message: "Error fetching booked seats" });
    }
});

router.post("/addBooking", checkAuthentication, async (req, res) => {
    const { movie, theater, screen, showTime, seats, totalPrice, status } = req.body;


    try {
        const bookings = await BookingTicket.create({
            user: req.user._id,
            movie,
            theater,
            screen,
            showTime,
            seats,
            totalPrice,
            status
        });



        res.json({ message: "Ticket Booked Successfully!", bookings });

    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/allBookings", checkAuthentication, async (req, res) => {
    try {
        const bookings = await BookingTicket.find({
            user: req.user._id,
        }).populate('movie');

        console.log(bookings)

        res.json({ bookings });

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err)
    }
});

module.exports = router;
