# Secure ToDo Application

## Description

This is the frontend for a full-stack ToDo application built with React.js and Express.js that allows users to manage their personal tasks securely. Users can register with their Gmail account, log in securely, and manage their ToDos with full CRUD functionality. The app showcases a React frontend with a secure Node.js/Express backend, implementing JWT authentication and various security middleware. It's designed to be both user-friendly and secure, making it a professional-grade web application.

## Purpose

The app demonstrates how to:

-   Implement secure user authentication using JWT (JSON Web Tokens)
-   Build a responsive React frontend with state management
-   Create secure API endpoints with middleware validation
-   Handle user data persistence and CRUD operations
-   Implement input validation and security checks

## Key Features

-   **User Authentication:** Secure registration and login system that validates Gmail addresses
-   **JWT Security:** All API requests after login are secured with JWT tokens
-   **CRUD Operations:** Users can Create, Read, Update, and Delete their ToDos
-   **Task Management:** Toggle completion status of tasks and edit task content
-   **Input Validation:** Middleware ensures all inputs are validated before processing
-   **Responsive Design:** Clean, modern interface that works on both desktop and mobile devices

---

## How to Install:

### Requirements

-   [Node.js](https://nodejs.org/)
-   npm (comes with Node.js)

### Steps

1. Set up the backend:

    - Navigate to the backend folder:
        ```bash
        cd backend
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the backend server:
        ```bash
        npm start
        ```

2. Set up the frontend:

    - Navigate to the frontend folder:
        ```bash
        cd frontend
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the frontend app:
        ```bash
        npm start
        ```

3. Open http://localhost:3000/ in your browser

---

## Technologies Used

-   **Backend:**
    -   Node.js
    -   Express.js
    -   JWT for authentication
    -   File system for data persistence
    -   Custom middleware for input validation
-   **Frontend:**
    -   React.js
    -   React Router for navigation
    -   Axios for API calls
    -   Local storage for token management
-   **Styling:**
    -   Custom CSS with responsive design

---

## Why This Project Stands Out

-   **Security First:** Implements comprehensive security measures including JWT authentication, input validation, and content-type checking
-   **Clean Architecture:** Organized codebase with clear separation of concerns between routes, controllers, and middleware
-   **User Experience:** Intuitive interface with immediate feedback on actions and clear error messages
-   **Scalable Design:** Modular component structure and reusable middleware that can be extended for larger applications
-   **Data Persistence:** Simple but effective file-based storage system that can be easily replaced with a database
