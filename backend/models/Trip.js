const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for now if testing without auth
    title: { type: String, required: true },
    destinations: [String],
    startDate: Date,
    endDate: Date,
    budget: Number,
    coverPhoto: String, // Base64 string or URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
