const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    title: { type: String, required: true },
    time: String,
    category: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
