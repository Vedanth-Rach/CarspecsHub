# Autimilezzz Backend API

Node.js + Express backend for the Autimilezzz car information platform.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

3. Start the server:
```bash
npm start
```

## Deployment on Render

### Configuration
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

### Environment Variables
Add these in Render dashboard:
- `MONGODB_URI` - Your MongoDB Atlas connection string

## API Endpoints

- `GET /` - Health check
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post

## MongoDB Setup

Get your connection string from MongoDB Atlas and add it to the environment variables.

Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
