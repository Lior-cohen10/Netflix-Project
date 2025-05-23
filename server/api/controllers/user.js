const userService = require('../services/user');

// Creates a new user using data from the request body and responds with the created user as JSON.
const createUser = async (req, res) => {
    const photo = req.file ? req.file.path : null;
    const newUser = await userService.createUser(req.body.username, req.body.password,
        photo, req.body.nickname, req.body.watchedMovies, false);
    const location = `/api/users/${newUser._id}`;
    res.status(201).location(location).json({});
};

// Retrieves a user by ID. Responds with 404 if the user is not found, otherwise returns the user as JSON.
const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.status(200).json(user);
};

// Exports the createUser and getUser functions.
module.exports = { createUser, getUser };