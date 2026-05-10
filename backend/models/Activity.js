const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    title: { type: String, required: true },
    time: String,
    location: String,
    description: String,
    image: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
