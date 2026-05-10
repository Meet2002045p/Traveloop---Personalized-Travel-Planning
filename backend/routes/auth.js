const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Register
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        try {
            const { name, email, password } = req.body;
            
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: 'User already exists' });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate a dynamic avatar based on the name
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

            user = new User({ name, email, password: hashedPassword, avatar: avatarUrl });
            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// Login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        try {
            const { email, password } = req.body;

            // Check user
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

            // Create Token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({
                token,
                user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

// Refresh Token Route (Issue #1)
router.get('/refresh', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Generate a new token with a fresh 1h expiration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
