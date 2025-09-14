// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        language: {
            type: String,
            default: "English",
            trim: true,
        },
        showtime: {
            type: String, // Can also use Date if you want exact datetime
            required: true,
            trim: true,
        },
        price: {
            type: String,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
