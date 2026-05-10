const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
    try {
        const note = new Note({ ...req.body, userId: req.user.id });
        await note.save();
        res.status(201).json(note);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || note.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
        await note.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
