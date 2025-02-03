# Netflix web server

## Table of Contents

-	Overview
-	Project structure
-	API Design
-	Implemented RESTful API
-	UML
-	Running
-	Running Examples

## Overview

The project consists of a client-server-based system for movie recommendations and streaming. Last part of the project was focused on the basic functionality, including implementing the client and server, handling commands for movie recommendations, and utilizing a multi-threaded approach for managing multiple clients.

Now, the focus shifts to implementing a RESTful API for the web server, integrating it with MongoDB for data storage, and enhancing user functionality with login, registration, and movie browsing features. This part also extends the system to provide personalized recommendations based on user preferences.


## Project Structure
#### Server:

 - The server will expose a RESTful API to manage users, movies, categories, and recommendations.
 - It will store and retrieve user and movie data in MongoDB.
 - The server will handle user authentication and session management, as well as interact with the recommendation system from Part A.
 - Multi-threading will still be used to handle concurrent client requests, but the server will now handle API requests over HTTP using ThreadPool to manage worker threads efficiently.

#### Client:

- implemented in Python and communicates with the server via HTTP requests to interact with the movie recommendation system and user-related operations.
- provide a user interface for login, registration, browsing movies, and viewing recommendations.

## API Design
#### User Authentication and Registration:

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

#### Movie Recommendations:

- GET /api/movies/:id/recommend: Returns recommended movies based on the movie with the specified id, utilizing the recommendation system from Part A for the current user.
- POST /api/movies/:id/recommend: Adds the specified movie to the current user's list of viewed movies, contributing to future recommendations.
- For the POST/GET recommendations endpoints, the web server will interact with the recommendation server from Part A, using a socket connection to communicate with the recommendation system.
- Additionally, the recommendation system’s multi-threading implementation will be modified to use a ThreadPool for better performance and handling multiple requests concurrently.

#### Search Functionality:

- GET /api/movies/search/:query: Returns movies that match the search query in any of their fields (e.g., title, description).
  Updates to the Project:


## Implemented RESTful API: 
- The server now exposes endpoints for user authentication, movie browsing, and recommendations via HTTP.
- MongoDB Integration: Data related to users, movies, and categories is now stored in MongoDB, allowing for persistence.
- Client-Server Communication via HTTP: The client communicates with the server through HTTP requests, allowing users to interact with the system and perform various actions such as registration, login,     and searching for movies.
- Recommendation System Integration: The server interacts with the recommendation system developed in Part A to provide personalized movie recommendations based on the user’s preferences and watched         movies.
- ThreadPool for Multi-threading: The recommendation system from Part A has been updated to use ThreadPool for efficient multi-threading and handling concurrent requests.

## UML
<img width="1070" alt="image" src="https://github.com/user-attachments/assets/6de55b30-bbd4-445d-bc28-5a833e998364" />

## Running
1. Create config folder at folder "api"
2. In config create a file ".env.local"
3. In .env.local insert the code:
CONNECTION_STRING=mongodb://host.docker.internal:27017/api
PORT=12345
RECCOMENDATION_IP=netflix-project
RECCOMENDATION_PORT=8080


Build: docker-compose build

*Prepare for next run: docker-compose down --remove-orphans

split treminal

#### Recommendation system server:

Run: docker-compose run -it -v netflix:/usr/src/mytest/data --rm --name netflix-project server 8080

#### api:

Run: docker-compose run -it --rm --name app -p 12345:12345 -v mongo_data:/usr/src/data api

#### file api_request.rest:

Each section in the file represents a different API operation. The sections are separated by line breaks or comments (###).
how to use:
   1. install the extension REST Client
   2. open the api_request.rest file
   3. click the "Send Request" on the request you want to run
   4. replace <ID> with the actual user ID
Whenever a field is defined as a list (e.g: categories, movies), you can include multiple values (IDs) inside the brackets [].

# Running Examples
create new user

![1  create new user](https://github.com/user-attachments/assets/fac0e424-211a-4097-b550-a784b2829fd2)

create new movie

![2  create new movie](https://github.com/user-attachments/assets/4ce9cef7-2f8d-4ff1-9556-17cb27036eee)

add movie to watchlist

![3  add movie to watchlist](https://github.com/user-attachments/assets/01b2d81f-784d-403c-834d-32aab9bdb2f5)

create new category

![4  create new category](https://github.com/user-attachments/assets/85452a47-1caf-4215-800b-a16adb5ed9a4)

create new category

![5  create new category](https://github.com/user-attachments/assets/f8716787-abc5-4abd-9fa2-02646c6f7e3c)

patch category

![6  patch category](https://github.com/user-attachments/assets/07d7c5e7-8eb1-4d50-9dcd-285395d56c12)

get all movies

![7  get all movies](https://github.com/user-attachments/assets/a1f807df-8aac-4b82-8957-23c554e90c1b)

search

![8  search](https://github.com/user-attachments/assets/50947f51-d5cd-49ae-9e33-de13c22b5790)

categories

![9  categories](https://github.com/user-attachments/assets/0110d0ca-cf0f-4b6d-94b4-61c8f1df1e22)

movies

![10  movies](https://github.com/user-attachments/assets/f4500701-2e29-405b-a769-7baed775abfc)

users

![11  userd](https://github.com/user-attachments/assets/285a213b-3959-4ef3-9629-20e4b2cc17de)

recommend

![12  recommend](https://github.com/user-attachments/assets/0e7d2b2e-e014-4bb6-b49b-55eec4f3da55)



