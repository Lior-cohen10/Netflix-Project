# Netflix web server

# Table of Contents

-	Overview
-	Project structure
-	UML
-	Running
-	Running Examples

# Overview

The project consists of a client-server-based system for movie recommendations and streaming. Last part of the project was focused on the basic functionality, including implementing the client and server, handling commands for movie recommendations, and utilizing a multi-threaded approach for managing multiple clients.

Now, the focus shifts to implementing a RESTful API for the web server, integrating it with MongoDB for data storage, and enhancing user functionality with login, registration, and movie browsing features. This part also extends the system to provide personalized recommendations based on user preferences.


# Project Structure
#### Server:

 - The server will expose a RESTful API to manage users, movies, categories, and recommendations.
 - It will store and retrieve user and movie data in MongoDB.
 - The server will handle user authentication and session management, as well as interact with the recommendation system from Part A.
 - Multi-threading will still be used to handle concurrent client requests, but the server will now handle API requests over HTTP using ThreadPool to manage worker threads efficiently.

#### Client:

- implemented in Python and communicates with the server via HTTP requests to interact with the movie recommendation system and user-related operations.
- provide a user interface for login, registration, browsing movies, and viewing recommendations.

#### API Specification:

User Authentication and Registration:
- POST /api/users: Creates a new user. The request body will contain user information as a JSON object (e.g., name, profile picture).
- GET /api/users/:id: Retrieves the details of the user by their unique id (e.g., name, image, and other user data).
- POST /api/tokens: Authenticates a user. The request body will contain the username and password (as JSON). If successful, it returns a JSON with the user ID; otherwise, an error message will be returned.
  
- For any API call that requires user authentication, the user ID will be passed as part of the HTTP request header to identify the currently authenticated user.


#### Home Page (Movies):

Once logged in, the user will be presented with a home page displaying movies.

Categories:
- GET /api/categories: Returns a list of all available categories.
- POST /api/categories: Creates a new category.
- GET /api/categories/:id: Retrieves details of the category with the specified id.
- PATCH /api/categories/:id: Updates the category with the specified id.
- DELETE /api/categories/:id: Deletes the category with the specified id.

Movies:
- GET /api/movies: Returns a list of movies based on categories. If a category is marked as promoted, it will return 20 random movies that the user hasn’t watched yet. A special category will also return    20 movies the user has recently watched.
- POST /api/movies: Creates a new movie.
- GET /api/movies/:id: Returns details of the movie with the specified id.
- PUT /api/movies/:id: Updates the movie details with the specified id.
- DELETE /api/movies/:id: Deletes the movie with the specified id.

Movie Recommendations:
- GET /api/movies/:id/recommend: Returns recommended movies based on the movie with the specified id, utilizing the recommendation system from Part A for the current user.
- POST /api/movies/:id/recommend: Adds the specified movie to the current user's list of viewed movies, contributing to future recommendations.
- For the POST/GET recommendations endpoints, the web server will interact with the recommendation server from Part A, using a socket connection to communicate with the recommendation system.

Additionally, the recommendation system’s multi-threading implementation will be modified to use a ThreadPool for better performance and handling multiple requests concurrently.

Search Functionality:
- GET /api/movies/search/:query: Returns movies that match the search query in any of their fields (e.g., title, description).
  Updates to the Project:

Implemented RESTful API: 
- The server now exposes endpoints for user authentication, movie browsing, and recommendations via HTTP.
- MongoDB Integration: Data related to users, movies, and categories is now stored in MongoDB, allowing for persistence.
- Client-Server Communication via HTTP: The client communicates with the server through HTTP requests, allowing users to interact with the system and perform various actions such as registration, login,     and searching for movies.
- Recommendation System Integration: The server interacts with the recommendation system developed in Part A to provide personalized movie recommendations based on the user’s preferences and watched         movies.
- ThreadPool for Multi-threading: The recommendation system from Part A has been updated to use ThreadPool for efficient multi-threading and handling concurrent requests.

# UML
<img width="938" alt="image" src="https://github.com/Lior-cohen10/Netflix-Project/blob/main/UML.png?raw=true" />


## Updates
1. Implemented a threaded multi-client server in C++ that simultaneously handles several clients.
2. Implemented a client in Python.
3. Created Docker containers for the server and the client and updated the Docker Compose configuration accordingly.

# Running

Server:

Build: docker-compose build

Run: docker-compose run -it -v netflix:/usr/src/mytest/data --rm --name netflix-project server 8080

*Prepare for next run: docker-compose down --remove-orphans

Client:

Run: docker-compose run --rm client netflix-project 8080

Tests:

Build: docker-compose build
Run: docker-compose up tests

# Running Examples
<img width="938" alt="image" src="https://github.com/Lior-cohen10/Netflix-Project/blob/main/runExample2.jpg?raw=true" />
<img width="938" alt="image" src="https://github.com/Lior-cohen10/Netflix-Project/blob/main/runExample1.jpg?raw=true" />

