# Netflix Web Server

## Table of Contents

- Overview
- Project Structure
- API Design
- React Web Client Features
- Running the Application
- Additional Notes
- Running Examples

## Overview

The project consists of a client-server-based system for movie recommendations and streaming.  
The previous stage focused on implementing a RESTful API, handling user authentication, storing data in MongoDB, and integrating a recommendation system.

In this phase, a React-based web client was developed to interact with the API, allowing users to browse movies, watch trailers, search, and manage content. Additionally, a theme toggle (Dark/Light mode) was implemented.

## Project Structure

### Server:
- Exposes a RESTful API to manage users, movies, categories, and recommendations.
- Stores user and movie data in MongoDB.
- Handles authentication and session management via JWT.
- Manages API requests over HTTP using a multi-threaded approach with ThreadPool.

### Client (React):
Communicates with the server via HTTP requests using fetch().
Provides UI for authentication, movie browsing, search, and viewing recommendations.
Implements a Dark/Light mode toggle stored in localStorage.

### Client (Android):
Communicates with the server via HTTP requests using RetroFit.
Provides UI for authentication, movie browsing, search, and viewing recommendations.
Implements a Dark/Light mode toggle stored in localStorage.


## API Design

### User Authentication and Registration:
- **POST** `/api/users` - Creates a new user with provided details (name, profile picture, etc.).
- **GET** `/api/users/:id` - Retrieves user details.
- **POST** `/api/tokens` - Authenticates a user and returns a JWT token.

> Note: The user ID is passed in the request header for authenticated API calls.

### Home Page (Movies):
Once logged in, users see a homepage displaying available movies.

### Categories:
- **GET** `/api/categories` - Retrieves a list of all categories.
- **POST** `/api/categories` - Creates a new category.
- **GET** `/api/categories/:id` - Retrieves category details.
- **PATCH** `/api/categories/:id` - Updates a category.
- **DELETE** `/api/categories/:id` - Deletes a category.

### Movies:
- **GET** `/api/movies` - Returns movies based on categories.
- **POST** `/api/movies` - Creates a new movie.
- **GET** `/api/movies/:id` - Retrieves details of a movie.
- **PUT** `/api/movies/:id` - Updates a movie.
- **DELETE** `/api/movies/:id` - Deletes a movie.

### Movie Recommendations:
- **GET** `/api/movies/:id/recommend` - Fetches recommended movies based on the given movie ID.
- **POST** `/api/movies/:id/recommend` - Adds the movie to the user's watched list.

> Note: The recommendation system interacts with the server via a socket connection.

### Search Functionality:
- **GET** `/api/movies/search/:query` - Returns movies matching the search query.

## React Web Client Features

### Implemented Screens:
- **Landing Page** (for non-logged-in users)
- **Login Page**
- **Registration Page** (similar to login but with additional fields like name and profile picture)
- **Main Dashboard** (displays movies available for viewing)
- **Movie Details Page** (shows full movie details and recommended movies)
- **Movie Player Page** (video player for watching movies)
- **Search Results Page**
- **Admin Panel** (available only for admin users, configured manually in MongoDB)

### Authorization & Access Control:
- Everyone can access the landing page and the login/register pages.
- Registered Users can access the main dashboard, movie details, movie player, and search results.
- Admins can access the admin panel to manage movies and categories.

### Admin Panel Features:
- Add/Edit/Delete movies.
- Add/Edit/Delete categories.
- A movie cannot exist without a category—if removed, it is automatically assigned to a default unAttached category and will not be displayed to users.

### Theme Toggle (Dark/Light Mode):
- Implemented via `localStorage` to persist user preferences.
- Allows users to switch between themes via a button in the navigation bar.

## Running the Application

### Create .env.local:
- Create config folder at folder "api"
- In config create a file ".env.local"
- In .env.local insert the code:
```bash
CONNECTION_STRING=mongodb://host.docker.internal:27017/api
PORT=12345
RECCOMENDATION_IP=netflix-project
RECCOMENDATION_PORT=8080
JWT_KEY=secretkey441311
```

### Build:
in the main file:
```bash
docker-compose build
```

### Prepare for next run (if needed):
```bash
docker-compose down --remove-orphans
```

## Running the Containers

### Recommendation System Server:
```bash
docker-compose run -it -v netflix:/usr/src/mytest/data --rm --name netflix-project server 8080
```

### API Server:
```bash
docker-compose run -it --rm --name app -p 12345:12345 -v mongo_data:/usr/src/data api
```

### React Web Client:
```bash
docker-compose run -it --rm --name netflix-web -p 3000:3000 web
```
> After starting the web client, the application is accessible at:
http://localhost:3000/


### Android Client:
Create a new device (Emulator) - pixel 2, R
Run the Emulator

## Additional Notes
### Admin Panel Access:
The admin user is manually defined in MongoDB. 
Upon re-login, the admin can access the management dashboard.
All files are stored inside Docker containers.

### Running API Requests
A api_request.rest file is included for testing API calls. 

Usage steps:

- Install the REST Client extension in VS Code.
- Open api_request.rest.
- Click Send Request on the desired API operation.
- Replace placeholders (e.g., user IDs) as needed.

> This README reflects all changes introduced in Phase 4 of the project

## Running Examples

### Home screen for non-logged-in users
![מסך הבית למשתמשים לא מחוברים](https://github.com/user-attachments/assets/4cd748e9-5f14-4b7c-bf7e-d72ec798a7e3)

### Registeration screen
![מסך הרשמה](https://github.com/user-attachments/assets/20081887-e789-4c74-93c8-ec8128c61141)

### Registeration screen - wrong input
![ניסיון הרשמה כושל עם קלט לא תקין](https://github.com/user-attachments/assets/3191a630-c681-48fc-8720-80e12fa76c91)

### Registeration screen - correct input
![ביצוע הרשמה עם קלט תקין](https://github.com/user-attachments/assets/afb77034-0712-4fe4-becf-bac46ed491cd)

### Login screen
![מסך התחברות](https://github.com/user-attachments/assets/98280790-d412-40f5-ac2f-90b31d606dfb)

### Home screen for logged-in users
![מסך הבית לאחר התחברות](https://github.com/user-attachments/assets/dde15729-38ed-4a90-814a-0396cfe6ed2b)
![מסך הבית לאחר התחברות - למטה](https://github.com/user-attachments/assets/1e931a9d-bcaf-4a15-87bc-a0ea7aa9dbf1)

### Movie details screen
![מסך פרטי סרט ספציפי](https://github.com/user-attachments/assets/bc1516b5-ef52-465f-9aa4-75f40b4b9157)

### Watch movie screen
![מסך צפייה בסרט](https://github.com/user-attachments/assets/96ce0223-868e-45c1-b504-0c65bf401093)

### Light mode
![שינוי למצב בהיר](https://github.com/user-attachments/assets/e1af0e31-0f79-402b-b908-841d5c704af9)

### Search
![חיפוש](https://github.com/user-attachments/assets/4fed3a34-7712-4928-bd18-24bebaf509b4)

### Admin screen
![מסך מנהלים](https://github.com/user-attachments/assets/526ca4bb-b6ff-4db5-a7a7-8235747a53ac)

### Create a new movie
![יצירת סרט חדש](https://github.com/user-attachments/assets/d37c3f38-c966-41b8-9055-49ffcd464b1b)

### Create new category
![יצירת קטגוריה חדשה](https://github.com/user-attachments/assets/70b83bec-59ad-49b9-91c3-1d787ad82aa6)

### Edit category
![עריכת קטגוריה](https://github.com/user-attachments/assets/00a53731-de1a-4034-94b9-26dec4998af3)

### Edit movie (light mode)
![עריכת סרט](https://github.com/user-attachments/assets/d14e9f71-0e0d-4213-9b91-af39e8e6b9f6)






