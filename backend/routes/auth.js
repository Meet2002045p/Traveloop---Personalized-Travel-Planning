const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dummy auth route for now
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password }); // Password should be hashed in production
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
