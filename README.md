# Saved Places API

This is a REST API for managing saved places. Users can sign up and log in. Authenticated users can create, read, update, and delete their own saved places. Places support images, search, filtering, and pagination.

## Features

- User signup and login
- JWT-based authentication
- Protected place CRUD routes
- Ownership-based access control
- Image URL support for places
- Search by place name or description
- Filter places by image presence
- Pagination for `GET /places`
- JSON error handling
- Rate limiting on auth routes

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`
- `express-rate-limit`
- `dotenv`

## Setup

1. Clone the repository

```bash
git clone https://github.com/djjohnson20/saved-places-api.git
cd saved-places-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root

Add your environment variables before starting the server.

4. Start the server

```bash
npm start
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/saved_places
JWT_SECRET=your_jwt_secret_here
```

## API Overview

### Auth Routes

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Log in and receive a JWT

### Place Routes

All place routes require a valid JWT in the `Authorization` header using the format:

```http
Authorization: Bearer <token>
```

- `POST /places` - Create a new saved place
- `GET /places` - Get the authenticated user’s places
- `PATCH /places/:id` - Update one of the user’s saved places
- `DELETE /places/:id` - Delete one of the user’s saved places

## Status

In progress 🚧
