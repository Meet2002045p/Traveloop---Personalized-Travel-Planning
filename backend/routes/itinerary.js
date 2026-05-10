const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id }).sort({ time: 1 });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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
            const activity = new Activity({
                ...req.body,
                userId: req.user.id
            });
            const newActivity = await activity.save();
            res.status(201).json(newActivity);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Update an activity (PUT Route added for Issue #8)
router.put('/:id', auth, async (req, res) => {
    try {
        let activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        if (activity.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        activity = await Activity.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(activity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        if (activity.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await activity.deleteOne();
        res.json({ message: 'Activity deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
