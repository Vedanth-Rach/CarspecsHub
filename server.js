const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow parsing of JSON request bodies

// Connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// A simple test route to check if the API is running
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// ... (Your existing server.js code)

const Post = require('./models/Post'); // Import the model

// Create a new post (CREATE)
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts (READ)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ... (You can add more routes for single posts, updating, and deleting)