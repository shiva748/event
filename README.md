# Event Management Application

A full-stack MERN application for event management and registration.

## Features

- User authentication (register, login)
- Create events with title, description, and date
- Register for events
- View all upcoming events
- View events you've registered for
- Cancel event registrations

## Technologies Used

- MongoDB - Database
- Express - Backend framework
- React - Frontend library
- Node.js - JavaScript runtime
- JWT - Authentication
- Axios - HTTP requests
- React Router - Routing

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB account (local or Atlas)

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string.

### Installation

1. Clone the repository
2. Install server dependencies:
   ```
   cd fullstack-event-app/server
   npm install
   ```
3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Running the Application

1. Start the server (from the server directory):
   ```
   npm run dev
   ```
2. Start the client (from the client directory):
   ```
   npm start
   ```
3. Open your browser and go to `http://localhost:3000`

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Event Routes
- `POST /api/events` - Create a new event (auth required)
- `GET /api/events` - Get all events
- `POST /api/events/:eventId/register` - Register for an event (auth required)
- `DELETE /api/events/:eventId/cancel/:userId` - Cancel event registration (auth required)

### User Routes
- `GET /api/users/:userId/events` - Get events registered by a user (auth required) # event
# event
