const axios = require('axios');
const MovieModel = require('../models/movie');


const fetchAndSaveMovie = async (req, res) => {
    try {
        const movieId = req.params.movieId; 
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

        const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
        const movieImagesUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.TMDB_API_KEY}`;

       
        const movieResponse = await axios.get(movieUrl);
        const creditsResponse = await axios.get(creditsUrl);
        const movieimageRespose = await axios.get(movieImagesUrl);
        
        const movieData = movieResponse.data;
        const creditsData = creditsResponse.data;
        const movieimageData = movieimageRespose.data;

        
        const director = creditsData.crew.find(crewMember => crewMember.job === 'Director');
        
        
        const directorName = director ? director.name : 'Unknown';
        
        const movie = new MovieModel({
            title: movieData.title,
            description: movieData.overview,
            genre: movieData.genres.map(genre => genre.name),
            director: directorName,  
            cast: creditsData.cast.map(actor => actor.name),
            releasedate: movieData.release_date,
            language: movieData.original_language,
            duration: `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m`,  
            rating: movieData.vote_average,
            poster_urls: movieimageData.posters.slice(0,4).map(poster => `https://image.tmdb.org/t/p/w500${poster.file_path}`),
            backdrop_urls: movieimageData.backdrops.slice(0,3).map(backdrop => `https://image.tmdb.org/t/p/w500${backdrop.file_path}`)
        });

        // Save movie 
        await movie.save();

        return res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all movies from the database
const getMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found.' });
        }
        return res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get one movie by ID from the database
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params; 
        const movie = await MovieModel.findById(id); 

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        return res.status(200).json(movie); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { fetchAndSaveMovie, getMovies,getMovieById };
