const express = require('express');

const feedController = require('./controllers');

const router = express.Router();

// GET /feed/posts
router.get('/users', feedController.getUsers);

// POST /feed/post
router.post('/user', feedController.createUser);

module.exports = router;
