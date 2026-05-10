const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Get all trips for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a trip
router.post(
    '/',
    [
        auth,
        [check('title', 'Title is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        try {
            const trip = new Trip({
                ...req.body,
                userId: req.user.id // Link to user
            });
            const newTrip = await trip.save();
            res.status(201).json(newTrip);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Update a trip (PUT Route added for Issue #8)
router.put('/:id', auth, async (req, res) => {
    try {
        let trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        trip = await Trip.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(trip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await trip.deleteOne();
        res.json({ message: 'Trip deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
