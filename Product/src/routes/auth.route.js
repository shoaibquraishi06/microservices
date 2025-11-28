const express = require('express');
const router = express.Router();

// Minimal stub routes for tests. Expand with real auth logic as needed.
router.post('/login', (req, res) => res.status(200).json({ token: 'test-token' }));
router.post('/register', (req, res) => res.status(201).json({ message: 'registered' }));

module.exports = router;
