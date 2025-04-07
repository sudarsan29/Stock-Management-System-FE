<<<<<<< HEAD
## Stock Management System

## Project Overview

This is a Full Stack Stock Management System developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The project is designed to manage products, including adding, editing, deleting, and viewing product details with image upload functionality. It also includes user authentication and authorization features.

## Technologies Used

## Frontend:
React.js
Axios
Redux

## Backend:
Node.js
Express.js
MongoDB (Mongoose)
Multer (for image upload)

## Tools Used:
VS Code
Postman (API Testing)
MongoDB Compass

## Project Structure

## Frontend Folder Structure

src/└─ pages/
    ├─ Login.js
    ├─ Product.js
    ├─ product.css
    ├─ Profile.js
    ├─ Register.js
    ├─ stockOverview.js
    ├─ AddProduct.js
    └─ Home.js

src/└─ redux/
    ├─ combineReducer.js
    ├─ store.js
    └─ userReducer.js

src/
    ├─ App.js
    ├─ Config.js
    ├─ index.js
    └─ components/
        ├─ Navbar.js
        └─ ProductForm.js

public/
    └─ index.html

## Run Frontend:

cd my-app
npm start

## Backend Folder Structure

Server.js - Main entry file
Config.js - MongoDB connection setup
uploads/ - Uploaded images storage

routes/
    ├─ user_route.js - Signup and Login functionality
    ├─ Product_route.js - Product CRUD operations
    ├─ file_route.js - File uploading route

middleware/
    └─ protectedResource.js - Authorization middleware

Models/
    ├─ product.js - Product schema
    └─ user.js - User schema

## Run Backend:

Nodemon server

## Features

User Authentication & Authorization (JWT)

Add Product with Image Upload

Edit Product Details

Delete Product

View Product Details

Stock Overview Page

Responsive UI Design

Sweetalert for proper info

## Screenshots

[Screenshots of Stock Management Application] (src/Screenshots of Stock Management Application.docx)

## Links

GitHub Repository: https://github.com/sudarsan29

LinkedIn Profile: https://www.linkedin.com/in/sudharshan-malyavantam/

## Usage

Clone the repository.

Navigate to the frontend folder and run npm start.

Navigate to the backend folder and run nodemon server.

Use Postman for API testing.

MongoDB Compass for database management.

## Author

Sudharshan Malyavantam
=======
# stock-management-system
>>>>>>> d25d57832e54eb26bb497399516cea500bbe97f5
