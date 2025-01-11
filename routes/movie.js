const express = require('express');
const router = express.Router();
const { fetchAndSaveMovie, getMovies, getMovieById } = require('../Controllers/movieController');


router.get('/movie/:movieId', fetchAndSaveMovie);
router.get('/movies', getMovies); 
router.get('/movies/:id', getMovieById); 

module.exports = router;
