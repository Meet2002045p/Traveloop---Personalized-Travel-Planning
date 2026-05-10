const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    title: { type: String, required: true },
    content: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
