const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    totalTickets: {
        type: Number,
        required: true,
    },
    availableTickets: {
        type: Number,
        required: true,
    },
    priceETH: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isFlagged: {
        type: Boolean,
        default: false,
    },
    reportCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
