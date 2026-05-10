const express = require('express');
const router = express.Router();
const PackingItem = require('../models/PackingItem');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const items = await PackingItem.find({ userId: req.user.id });
        res.json(items);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
    try {
        const item = new PackingItem({ ...req.body, userId: req.user.id });
        await item.save();
        res.status(201).json(item);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let item = await PackingItem.findById(req.params.id);
        if (!item || item.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
        
        item.isPacked = req.body.isPacked;
        await item.save();
        res.json(item);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await PackingItem.findById(req.params.id);
        if (!item || item.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
        await item.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
