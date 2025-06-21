# Books World

## Overview  
Books World is a full-stack web application designed to allow users to explore a wide range of books, read detailed reviews, submit their own feedback, and rate books. This platform was developed as part of a Full Stack Developer assignment with the objective of combining robust backend API services with a dynamic and user-friendly React frontend.

### **Key Features**
### Frontend (React)
-  **Home Page** – Displays featured or top-rated books
-  **Books Listing** – Search, sort, and filter books by genre, author, or rating
-  **Single Book Page** – Shows detailed book info and user reviews
-  **Review Form** – Logged-in users can write and submit reviews
-  **User Profile Page** – View and edit user details
-  **State Management** – Handled with React Context API/Redux
-  **Routing** – Navigation using React Router
-  **Error & Loading States** – Graceful error handling and feedback UI

### Backend Functionality – API Endpoints Breakdown
## User Authentication & Profile
    POST /api/user/register
   Registers a new user by saving their credentials and profile info to the database.

    POST /api/user/login
  Authenticates user credentials and returns a session token or cookie.

    POST /api/user/logout
  Logs the user out by clearing session/cookie/token.

    POST /api/user/get-user-data
  Returns authenticated user details using a token or session ID.

## Books Management
    GET /api/books/get-all?page=&limit=
   Retrieves a paginated list of all books, with optional query params for pagination.

    GET /api/books/:bookID
   Fetches detailed information about a specific book using its ID.

    POST /api/books/upload
   Allows an admin to upload a new book to the database, including metadata and optional image/file.

## Reviews Management
    GET /api/reviews/get-all?bookId=
   Retrieves all reviews for a specific book, filtered using the bookId query param.

    POST /api/reviews/upload
   Allows a logged-in user to submit a review and rating for a book.
   
# Getting Started with Create React App
Fallow these steps to set up and run the project.

## Prerequisites
Before running the project, ensure you have the fallowing installed:

Node.js (Download from [here](https://nodejs.org/en/download))

npm (Comes with Node.js)
## Project Setup
1) Open main directory and run the fallowing command to install dependancies.
```
npm install
```
2) create a .env file and write the fallowing code.
```
REACT_APP_BACKEND_URL=http://127.0.0.1:5500
```
3) create another .env file in router folder and write the fallowing code
```
PORT=5500
MONGO_DB_URL=mongodb://localhost:27017/books-world
SECRETE_KEY=[dummy charecters]
```
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


5) Start backend by opening command prompt in router folder and paste the fallowing command
```
npm start
```
The page will reload when you make changes.
