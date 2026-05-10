const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an expense
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('amount', 'Amount must be a number').isNumeric()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        try {
            const expense = new Expense({
                ...req.body,
                userId: req.user.id
            });
            const newExpense = await expense.save();
            res.status(201).json(newExpense);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Update an expense (PUT Route added for Issue #8)
router.put('/:id', auth, async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        if (expense.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        expense = await Expense.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        if (expense.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await expense.deleteOne();
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
