// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();

// Use middleware to parse request body
app.use(bodyParser.json());

// Use middleware to handle CORS
app.use(cors());

// Create data store
const commentsByPostId = {};

// Handle GET request
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Handle POST request
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get comments for post
    const comments = commentsByPostId[req.params.id] || [];

    // Add comment to comments
    comments.push({ id: commentId, content });

    // Update comments for post
    commentsByPostId[req.params.id] = comments;

    // Send back comments
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});