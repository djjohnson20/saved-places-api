# Saved Places API

This is a REST API for managing saved places. Users can sign up and log in. Authenticated users can create, read, update, and delete their own saved places. Places support images, search, filtering, and pagination.

## Live API

- Base URL: `https://saved-places-api.onrender.com`
- Health check: `https://saved-places-api.onrender.com/health`

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
- Rate limiting on auth routes and general API usage
- Automated integration tests for auth and places routes

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`
- `express-rate-limit`
- `dotenv`
- `jest`
- `supertest`
- `mongodb-memory-server`

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

5. Run the test suite

```bash
npm test
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/saved_places
JWT_SECRET=your_jwt_secret_here
```

## API Overview

### General Routes

- `GET /` - Returns a simple API status message
- `GET /health` - Returns a health check response

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
- `GET /places/:id` - Get one saved place by id
- `PATCH /places/:id` - Update one of the user’s saved places
- `DELETE /places/:id` - Delete one of the user’s saved places

### `GET /places` Query Parameters

The `GET /places` route supports optional query parameters for filtering and pagination:

- `search` - Search by place name or description
- `hasImage=true` - Return only places with a `pictureUrl`
- `hasImage=false` - Return only places without a `pictureUrl`
- `page` - Page number for paginated results
- `limit` - Number of results per page

Example requests:

```http
GET /places?search=cafe
GET /places?hasImage=true
GET /places?page=1&limit=10
GET /places?search=cafe&hasImage=true&page=1&limit=5
```

## Security

- JWT authentication is required for protected place routes
- Rate limiting is applied to auth routes and general API usage
- Users can only access and modify their own saved places

## Testing

The project includes automated integration tests using `jest`, `supertest`, and `mongodb-memory-server`.

Current test coverage includes:

- Auth validation
- Signup success and duplicate signup handling
- Login success and invalid credential handling
- Protected route access without a token
- Place creation, retrieval, update, and deletion
- Invalid place id validation
- Not found responses for place routes
- Search filtering
- Pagination behavior

## Current Status

The API is deployed and live on Render. The backend currently includes authentication, protected CRUD routes, search, filtering, pagination, image URL support, rate limiting, and automated integration tests for auth and places routes.

Planned improvements include expanded API documentation, additional backend features, and further production polish.
