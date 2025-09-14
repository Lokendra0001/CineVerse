const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    theater: {
        type: String, // store theater ID or name
        required: true,
    },
    screen: {
        type: String,
        required: true,
    },
    showTime: {
        type: String, // exact show datetime
        required: true,
    },
    seats: [
        {
            type: String, // e.g. "A1", "A2", "B5"
            required: true,
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("bookedMovie", bookingSchema);
