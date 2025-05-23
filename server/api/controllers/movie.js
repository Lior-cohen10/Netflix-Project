const movieService = require('../services/movie');
const mongoose = require('mongoose');
// Function to create a new movie
const createMovie = async (req, res) => {

    const image = req.files && req.files.image ? req.files.image[0].path : null;
    const video = req.files && req.files.video ? req.files.video[0].path : null;
    const trailer = req.files && req.files.trailer ? req.files.trailer[0].path : null;

    if(!image || !video || !trailer) {  
        return res.status(400).json({ error: 'Invalid or missing image, video or trailer' });
    }

    let categories = [];

    if (req.body.categories) {
        if (typeof req.body.categories === 'string') {
            categories = req.body.categories.split(',').map(categoryId => new mongoose.Types.ObjectId(categoryId));
        } else if (Array.isArray(categories)) {
            categories = req.body.categories;
        }
    }
    const newMovie = await movieService.createMovie(req.body.name, categories, req.body.movie_time,
        image, req.body.Publication_year, req.body.description, req.body.age, video, trailer);
    const location = `/api/movies/${newMovie._id}`;
    res.status(201).location(location).json(newMovie);
};

// Function to get movies based on categories for a user.
const getMovies = async (req, res) => {
    const userId = req.header('userId');
    const moviesByCategories = await movieService.getMoviesByCategories(userId);

    // If no movies are found, responds with a 400 error
    if (!moviesByCategories) {
        res.status(404).json({ error: ['Movie Not Found'] });
    }
    res.status(200).json(moviesByCategories);
};

// Function to get a movie by its ID.
const getMovie = async (req, res) => {
    const movie = await movieService.getMovieById(req.params.id);

    // If no movie is found, responds with a 404 error
    if (!movie) {
        return res.status(404).json({ errors: ['Movie Not Found'] });
    }
    res.status(200).json(movie);
};

// Function to update an existing movie's details.
const updateMovie = async (req, res) => {
    const image = req.files && req.files.image ? req.files.image[0].path : null;
    const video = req.files && req.files.video ? req.files.video[0].path : null;
    const trailer = req.files && req.files.trailer ? req.files.trailer[0].path : null;

    if(!image || !video || !trailer) {  
        return res.status(400).json({ error: 'Invalid or missing image, video or trailer' });
    }
    
    let categories = [];
    if (req.body.categories) {
            if (typeof req.body.categories === 'string') {
                categories = req.body.categories.split(',').map(categoryId => new mongoose.Types.ObjectId(categoryId));
            } else if (Array.isArray(categories)) {
                categories = req.body.categories;
            }
        }

    const movie = await movieService.updateMovie(req.params.id, req.body.name, categories, req.body.movie_time,
        image, req.body.Publication_year, req.body.description, req.body.age, video, trailer);

    // If no movie is found to update, responds with a 404 error
    if (!movie) {
        return res.status(404).json({ errors: ['Movie Not Found'] });
    }
    res.status(200).json(movie);
};

// Function to delete a movie by its ID
const deleteMovie = async (req, res) => {
    const movie = await movieService.deleteMovie(req.params.id);

    // If no movie is found to delete, responds with a 404 error
    if (!movie) {
        return res.status(404).json({ errors: ['Movie Not Found'] });
    }
    res.status(204).json(movie);
};

// Function to search for movies using a query parameter.
const getMovieIncludeQuery = async (req, res) => {
    const query = req.params.query;

    // If no query is provided, responds with a 400 error
    if (!query) {
        return res.status(400).json({ error: ['Search query is required'] });
    }

    // Calls the movieIncludeQuery function from movieService with the search query.
    const movies = await movieService.movieIncludeQuery(query);

    if (!movies || movies.length === 0) {
        return res.status(404).json({ error: ['No movies found'] });
    }
    res.status(200).json(movies);

};

const getAllMovie =  async (req, res) => {
    const movies = await movieService.getAllMovie();
    res.status(200).json(movies);
};

// Exporting all functions to be used in routes
module.exports = { createMovie, getMovies, getMovie, updateMovie, deleteMovie, getMovieIncludeQuery, getAllMovie};