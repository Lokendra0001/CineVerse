const { Router } = require('express');
const router = Router();
const Movie = require('../models/movie-model'); // import Movie model

// GET all movies (protected route)
router.get('/getAllMovies', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }); // newest first
        console.log(movies)
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
});



router.get('/getMovie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
});

module.exports = router;


module.exports = router;
