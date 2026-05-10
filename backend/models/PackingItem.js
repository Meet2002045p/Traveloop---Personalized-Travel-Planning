const mongoose = require('mongoose');

const packingItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    itemName: { type: String, required: true },
    category: { type: String, default: 'General' },
    isPacked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PackingItem', packingItemSchema);
