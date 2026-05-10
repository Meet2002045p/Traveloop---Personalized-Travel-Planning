const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// @route   GET api/budget
// @desc    Get all user expenses
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Find expenses that belong to the logged-in user
        const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/budget
// @desc    Create an expense
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        
        const newExpense = new Expense({
            userId: req.user.id, // Securely link to the logged-in user
            title,
            amount,
            category,
            date
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE api/budget/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        // Make sure user owns the expense
        if (expense.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await expense.deleteOne();
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
